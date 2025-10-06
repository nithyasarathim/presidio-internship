import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { fetchPatients } from "../services/patientService";
import Table from "../components/TableComponent";
import toast from "react-hot-toast";
import CreatePatientModal from "../components/CreatePatientModal";

const DoctorPage = () => {
  const { token, darkMode } = useContext(UserContext);
  const [doctor, setDoctor] = useState({ name: "", email: "" });
  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [sort, setSort] = useState("createdAt_desc");
  const [filter, setFilter] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const loadPatients = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await fetchPatients(token, page, limit, sort, filter);
      setPatients(data.patients || []);
      setTotalPages(data.totalPages || 1);
      setDoctor(data.doctor || {});
    } catch (err) {
      toast.error("Failed to load patients");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPatients();
  }, [page, sort, filter, token]);

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen items-center px-15" : "bg-white text-black min-h-screen px-15"}>
      <header className="p-4 flex justify-between align-center">
          <h1 className="text-2xl px-5 py-2">Doctor Dashboard</h1>
          <p className="text-sm flex items-center gap-2">Welcome<p className='text-xl font-semibold pr-5'>{doctor.name}!</p> ({doctor.email})</p>
        <div className="flex items-center align-center gap-2">
          <div className=" w-fit flex gap-2">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-1 border rounded-lg"
            >
              <option value="createdAt_desc">Newest First</option>
              <option value="createdAt_asc">Oldest First</option>
              <option value="age_asc">Age Asc</option>
              <option value="age_desc">Age Desc</option>
              <option value="name_asc">Name A-Z</option>
              <option value="name_desc">Name Z-A</option>
            </select>
          </div>
          <button
            className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
            onClick={() => setCreateModalOpen(true)}
          >
            Create Patient
          </button>
        </div>
      </header>

      <main className="p-6">

        {loading ? (
          <p>Loading patients...</p>
        ) : (
          <Table
            patients={patients}
            page={page}
            setPage={setPage}
            totalPages={totalPages}
            darkMode={darkMode}
            token={token}
            reloadPatients={loadPatients}
          />
        )}

        {createModalOpen && (
          <CreatePatientModal
            token={token}
            darkMode={darkMode}
            onClose={() => setCreateModalOpen(false)}
            onSuccess={() => {
              setCreateModalOpen(false);
              loadPatients();
            }}
          />
        )}
      </main>
    </div>
  );
};

export default DoctorPage;
