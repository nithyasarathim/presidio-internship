import React, { useState } from "react";
import toast from "react-hot-toast";
import { updatePatient, deletePatient } from "../services/patientService";

const Table = ({ patients, page, setPage, totalPages, darkMode, token, reloadPatients }) => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editData, setEditData] = useState({});

  const handleRowClick = (patient) => {
    setSelectedPatient(patient);
    setEditData(patient);
  };

  const handleCloseModal = () => {
    setSelectedPatient(null);
    setEditData({});
  };

  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await updatePatient(token, selectedPatient._id, editData);
      toast.success("Patient updated successfully!");
      reloadPatients();
      setSelectedPatient(null);
    } catch {
      toast.error("Failed to update patient.");
    }
  };

  const handleDelete = async () => {
    try {
      await deletePatient(token, selectedPatient._id);
      toast.success("Patient deleted successfully!");
      reloadPatients();
      setSelectedPatient(null);
    } catch {
      toast.error("Failed to delete patient.");
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl w-[80vw] flex flex-col m-auto self-center">
      <table
        className={`w-full text-sm ${
          darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"
        }`}
      >
        <thead className="bg-sky-500 text-white">
          <tr>
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Age</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Phone</th>
            <th className="p-3 text-left">DOB</th>
          </tr>
        </thead>
        <tbody>
          {patients.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-6">
                No patients found.
              </td>
            </tr>
          ) : (
            patients.map((patient, index) => (
              <tr
                key={patient._id}
                onClick={() => handleRowClick(patient)}
                className={`cursor-pointer transition ${
                  darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                }`}
              >
                <td className="p-3">{(page - 1) * 10 + index + 1}</td>
                <td className="p-3 font-semibold">{patient.name}</td>
                <td className="p-3">
                  <span
                    className={`inline-block w-12 text-center px-2 py-1 text-xs font-bold rounded-full ${
                      patient.age < 18
                        ? "bg-yellow-200 text-yellow-800"
                        : patient.age < 40
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {patient.age}
                  </span>
                </td>
                <td className="p-3">{patient.email}</td>
                <td className="p-3">{patient.phone}</td>
                <td className="p-3">
                  {new Date(patient.dob).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div
        className={`flex justify-between items-center px-4 py-3 ${
          darkMode ? "bg-gray-800 text-gray-200" : "bg-gray-100 text-gray-700"
        }`}
      >
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 rounded-lg bg-sky-500 text-white disabled:opacity-50 hover:bg-sky-600 transition"
        >
          Prev
        </button>
        <span>
          Page <b>{page}</b> of <b>{totalPages}</b>
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 rounded-lg bg-sky-500 text-white disabled:opacity-50 hover:bg-sky-600 transition"
        >
          Next
        </button>
      </div>

      {selectedPatient && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#00000090]">
          <div
            className={`rounded-xl shadow-lg p-6 w-full max-w-md ${
              darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"
            }`}
          >
            <h2 className="text-xl font-bold mb-4">Patient Details</h2>

            <div className="flex flex-col gap-3">
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={handleInputChange}
                className="px-3 py-2 border rounded-lg"
              />
              <input
                type="number"
                name="age"
                value={editData.age}
                onChange={handleInputChange}
                className="px-3 py-2 border rounded-lg"
              />
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleInputChange}
                className="px-3 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="phone"
                value={editData.phone}
                onChange={handleInputChange}
                className="px-3 py-2 border rounded-lg"
              />
              <input
                type="date"
                name="dob"
                value={new Date(editData.dob).toISOString().split("T")[0]}
                onChange={handleInputChange}
                className="px-3 py-2 border rounded-lg"
              />
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500"
              >
                Close
              </button>
              <div className="flex gap-3">
                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
