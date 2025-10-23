import fitz  # PyMuPDF for PDF text extraction
from langchain_text_splitters import RecursiveCharacterTextSplitter
from sentence_transformers import SentenceTransformer
import chromadb
from chromadb.config import Settings
import subprocess

# --- Step 1: Extract Text from PDF ---
pdf_path = "data/sample.pdf"

pdf_text = ""
with fitz.open(pdf_path) as doc:
    for page in doc:
        pdf_text += page.get_text()

print(f"Extracted text from PDF ({len(pdf_text)} characters).")

# --- Step 2: Split Text into Chunks ---
splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
chunks = splitter.split_text(pdf_text)
print(f"Split into {len(chunks)} chunks.")

# --- Step 3: Generate Embeddings using Hugging Face ---
embedder = SentenceTransformer('all-MiniLM-L6-v2')
embeddings = embedder.encode(chunks)
print("Embeddings created successfully.")

# --- Step 4: Store in ChromaDB ---
client = chromadb.PersistentClient(path="./chroma_db")
collection = client.get_or_create_collection("pdf_chunks")

for i, chunk in enumerate(chunks):
    collection.add(
        ids=[str(i)],
        documents=[chunk],
        embeddings=[embeddings[i]]
    )

print("All chunks stored in ChromaDB.")

# --- Step 5: Query the RAG System ---
query = input("\n🔍 Enter your question: ")
query_embedding = embedder.encode([query])[0]

results = collection.query(
    query_embeddings=[query_embedding],
    n_results=3
)

top_chunks = results['documents'][0]
print("\nTop 3 relevant chunks:\n")
for i, chunk in enumerate(top_chunks, 1):
    print(f"Chunk {i}:\n{chunk[:500]}...\n")

# --- Step 6: Ask Mistral via Ollama ---
def ask_mistral(context, query):
    prompt = f"Answer the question based on the following context:\n\n{context}\n\nQuestion: {query}\nAnswer:"
    result = subprocess.run(
        ["ollama", "run", "mistral", prompt],
        capture_output=True,
        text=True
    )
    return result.stdout.strip()

context = "\n\n".join(top_chunks)
answer = ask_mistral(context, query)

print("\nMistral’s Answer:\n")
print(answer)
