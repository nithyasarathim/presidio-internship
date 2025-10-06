import React, { useState } from "react";

const Table = ({ patients, page, setPage, totalPages, darkMode }) => {
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleRowClick = (patient) => {
    setSelectedPatient(patient);
  };

  const handleCloseModal = () => {
    setSelectedPatient(null);
  };

  return (
    <div className="overflow-x-auto rounded-xl shadow-md">
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
            <th className="p-3 text-left">Created</th>
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
                <td className="p-3">{(page - 1) * 5 + index + 1}</td>
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
                <td className="p-3 text-gray-500">
                  {new Date(patient.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
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

      {/* Modal */}
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
                defaultValue={selectedPatient.name}
                className="px-3 py-2 border rounded-lg"
              />
              <input
                type="number"
                defaultValue={selectedPatient.age}
                className="px-3 py-2 border rounded-lg"
              />
              <input
                type="email"
                defaultValue={selectedPatient.email}
                className="px-3 py-2 border rounded-lg"
              />
              <input
                type="text"
                defaultValue={selectedPatient.phone}
                className="px-3 py-2 border rounded-lg"
              />
              <input
                type="date"
                defaultValue={new Date(
                  selectedPatient.dob
                ).toISOString().split("T")[0]}
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
                <button className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600">
                  Edit
                </button>
                <button className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600">
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
