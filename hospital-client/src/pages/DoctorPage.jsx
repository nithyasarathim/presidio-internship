import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { fetchPatients } from "../services/patientService";
import Table from "../components/TableComponent";
import toast from "react-hot-toast";

const DoctorPage = () => {
  const { token, darkMode } = useContext(UserContext);
  const [doctor, setDoctor] = useState({name:"",email:""});
  const [patients, setPatients] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [sort, setSort] = useState("createdAt_desc");
  const [filter, setFilter] = useState(""); 
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

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
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen" : "bg-white text-black min-h-screen"}>
      <header className="p-4 border-b flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Doctor Dashboard</h1>
          <p className="text-sm">{doctor.name} ({doctor.email})</p>
        </div>
      </header>

      <main className="p-6">
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="createdAt_desc">Newest First</option>
            <option value="createdAt_asc">Oldest First</option>
            <option value="age_asc">Age Asc</option>
            <option value="age_desc">Age Desc</option>
            <option value="name_asc">Name A-Z</option>
            <option value="name_desc">Name Z-A</option>
          </select>
        </div>

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
      </main>
    </div>
  );
};

export default DoctorPage;
