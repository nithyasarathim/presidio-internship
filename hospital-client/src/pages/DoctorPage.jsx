import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { fetchPatients } from "../services/patientService";
import PatientList from "../components/PatientListComponent";
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
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} min-h-screen px-4 sm:px-6 md:px-10 lg:px-20`}>
      <header className="p-4 flex sm:flex-row justify-between sm:items-center gap-2 sm:gap-0">
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold hidden md:block">Doctor Dashboard</h1>
        <p className="text-sm sm:text-base flex items-center gap-3 sm:gap-4">
          <span className="text-xs sm:text-sm font-medium">Welcome</span>
          <span className="text-sm sm:text-base font-semibold">{doctor.name}!</span>
          <span className="hidden lg:inline">({doctor.email})</span>
        </p>
        <div className="flex flex-wrap gap-2 mt-2 sm:mt-0 items-center flex-col md:flex-row">
          <div className="w-full sm:w-fit flex gap-2">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-1 border rounded-lg text-sm sm:text-base"
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
            className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition text-sm sm:text-base"
            onClick={() => setCreateModalOpen(true)}
          >
            Create Patient
          </button>
        </div>
      </header>

      <main className="p-4 sm:p-6">
        {loading ? (
          <p className="text-center py-6">Loading patients...</p>
        ) : (
          <PatientList
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
