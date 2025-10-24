import fitz
from langchain_text_splitters import RecursiveCharacterTextSplitter
from sentence_transformers import SentenceTransformer
import chromadb
import subprocess

pdf_path = "data/sample.pdf"
file_name = pdf_path.split("/")[-1]
system_prompt = "Answer only from the given documents. If not found, say: 'Information not available in the knowledge base.'"

# extract text from pdf
pdf_texts = []
with fitz.open(pdf_path) as doc:
    for page_num, page in enumerate(doc, start=1):
        text = page.get_text()
        pdf_texts.append({"page": page_num, "text": text})
print(f"Extracted text from {len(pdf_texts)} pages.")

# split text into chunks
splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=100)
chunks, metadata_list = [], []
for page_data in pdf_texts:
    text_chunks = splitter.split_text(page_data["text"])
    for chunk in text_chunks:
        chunks.append(chunk)
        metadata_list.append({
            "file_name": file_name,
            "page_number": page_data["page"]
        })
print(f"Split text into {len(chunks)} chunks.")

# create embeddings
embedder = SentenceTransformer('all-MiniLM-L6-v2')
embeddings = embedder.encode(chunks)
print("Embeddings created successfully.")

# store in chromadb
client = chromadb.PersistentClient(path="./chroma_db")
collection = client.get_or_create_collection("pdf_chunks")
for i, chunk in enumerate(chunks):
    collection.add(
        ids=[str(i)],
        documents=[chunk],
        embeddings=[embeddings[i]],
        metadatas=[metadata_list[i]]
    )
print("All chunks stored in ChromaDB with metadata.")

# ask a question
query = input("\nEnter your question: ")
query_embedding = embedder.encode([query])[0]
results = collection.query(
    query_embeddings=[query_embedding],
    n_results=3,
    include=["documents", "metadatas"]
)

top_chunks = results['documents'][0]
top_meta = results['metadatas'][0]
print("\nTop 3 relevant chunks:\n")
for i, (chunk, meta) in enumerate(zip(top_chunks, top_meta), start=1):
    print(f"Chunk {i} (File: {meta['file_name']}, Page: {meta['page_number']}):\n")
    print(f"{chunk[:400]}...\n")

# call mistral model
def ask_mistral(context, query):
    prompt = f"{system_prompt}\n\nAnswer the question based on the following context:\n\n{context}\n\nQuestion: {query}\nAnswer:"
    result = subprocess.run(
        ["ollama", "run", "mistral", prompt],
        capture_output=True,
        text=True,
        encoding="utf-8",
        errors="ignore"
    )
    return result.stdout.strip()

context = "\n\n".join(top_chunks)
answer = ask_mistral(context, query)
print("\nMistral’s Answer:\n")
print(answer)


# --- API part ---
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn

app = FastAPI(title="RAG API")

class QueryRequest(BaseModel):
    query: str

@app.post("/ask")
def ask_endpoint(request: QueryRequest):
    try:
        query = request.query
        query_embedding = embedder.encode([query])[0]
        results = collection.query(
            query_embeddings=[query_embedding],
            n_results=3,
            include=["documents", "metadatas"]
        )
        top_chunks = results["documents"][0]
        top_meta = results["metadatas"][0]
        context = "\n\n".join(top_chunks)
        prompt = f"{system_prompt}\n\nAnswer the question based on the following context:\n\n{context}\n\nQuestion: {query}\nAnswer:"

        result = subprocess.run(
            ["ollama", "run", "mistral", prompt],
            capture_output=True,
            text=True,
            encoding="utf-8",
            errors="ignore"
        )

        if result.returncode != 0:
            raise HTTPException(status_code=500, detail="Ollama not running or model failed to respond.")

        answer = result.stdout.strip()
        sources = [{"file": m["file_name"], "page": m["page_number"]} for m in top_meta]
        return {"answer": answer, "sources": sources}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="localhost", port=8000)
