import React, { useContext, useEffect, useState } from "react";
import { fetchDoctors, createDoctor, updateDoctor, deleteDoctor } from "../services/doctorService";
import toast from "react-hot-toast";
import UserContext from "../context/UserContext";
import { Edit2, Trash2 } from "lucide-react";

const DoctorCrudComponent = () => {
  const { token, darkMode } = useContext(UserContext);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newDoctor, setNewDoctor] = useState({ name: "", email: "", password: "", role: "doctor" });
  const [editDoctor, setEditDoctor] = useState(null);
  const [editData, setEditData] = useState({});
  const [deleteDoctorId, setDeleteDoctorId] = useState(null);
  const [page, setPage] = useState(1);
  const rowsPerPage = 8;

  const loadDoctors = async () => {
    if (!token) return toast.error("Not authorized");
    setLoading(true);
    try {
      const data = await fetchDoctors(token);
      setDoctors(data);
    } catch {
      toast.error("Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, [token]);

  const handleCreate = async () => {
    if (!token) return toast.error("Not authorized");
    try {
      await createDoctor(token, newDoctor);
      toast.success("Doctor created successfully!");
      setNewDoctor({ name: "", email: "", password: "", role: "doctor" });
      loadDoctors();
    } catch {
      toast.error("Failed to create doctor.");
    }
  };

  const handleEdit = (doctor) => {
    setEditDoctor(doctor);
    setEditData({ ...doctor, password: "" });
  };

  const handleUpdate = async () => {
    try {
      await updateDoctor(token, editDoctor._id, editData);
      toast.success("Doctor updated successfully!");
      setEditDoctor(null);
      loadDoctors();
    } catch {
      toast.error("Failed to update doctor.");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteDoctor(token, deleteDoctorId);
      toast.success("Doctor deleted successfully!");
      setDeleteDoctorId(null);
      loadDoctors();
    } catch {
      toast.error("Failed to delete doctor.");
    }
  };

  const totalPages = Math.ceil(doctors.length / rowsPerPage);
  const visibleDoctors = doctors.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div className="flex flex-col items-center w-[85vw] mx-auto space-y-8">
      <div
        className={`w-full p-6 rounded-xl shadow-md ${
          darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"
        }`}
      >
        <h3 className="text-lg font-semibold mb-4">Add New Doctor</h3>
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Name"
            value={newDoctor.name}
            onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
            className="px-3 py-2 border rounded-lg flex-1 min-w-[150px]"
          />
          <input
            type="email"
            placeholder="Email"
            value={newDoctor.email}
            onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
            className="px-3 py-2 border rounded-lg flex-1 min-w-[150px]"
          />
          <input
            type="password"
            placeholder="Password"
            value={newDoctor.password}
            onChange={(e) => setNewDoctor({ ...newDoctor, password: e.target.value })}
            className="px-3 py-2 border rounded-lg flex-1 min-w-[150px]"
          />
          <select
            value={newDoctor.role}
            onChange={(e) => setNewDoctor({ ...newDoctor, role: e.target.value })}
            className="px-3 py-2 border rounded-lg"
          >
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>
          <button
            onClick={handleCreate}
            className="px-5 py-2 rounded-lg bg-sky-600 text-white hover:bg-sky-700 transition"
          >
            Create
          </button>
        </div>
      </div>

      {/* Doctors Table */}
      <div className="overflow-x-auto rounded-xl w-full">
        {loading ? (
          <p className="text-center py-6">Loading doctors...</p>
        ) : (
          <table
            className={`w-full text-sm rounded-xl overflow-hidden ${
              darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"
            }`}
          >
            <thead className="bg-sky-500 text-white">
              <tr>
                <th className="p-3 text-left">#</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Created At</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleDoctors.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-6">
                    No doctors found.
                  </td>
                </tr>
              ) : (
                visibleDoctors.map((doc, index) => (
                  <tr
                    key={doc._id}
                    className={`transition ${
                      darkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
                    }`}
                  >
                    <td className="p-3">{(page - 1) * rowsPerPage + index + 1}</td>
                    <td className="p-3 font-semibold">{doc.name}</td>
                    <td className="p-3">{doc.email}</td>
                    <td className="p-3 capitalize">{doc.role}</td>
                    <td className="p-3">{new Date(doc.createdAt).toLocaleString()}</td>
                    <td className="p-3 flex gap-3">
                      <button
                        onClick={() => handleEdit(doc)}
                        className="p-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => setDeleteDoctorId(doc._id)}
                        className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div
        className={`flex justify-between items-center w-full px-4 py-3 rounded-lg ${
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

      {/* Edit Modal */}
      {editDoctor && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#00000090] z-50">
          <div
            className={`rounded-xl shadow-lg p-6 w-full max-w-md ${
              darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"
            }`}
          >
            <h2 className="text-xl font-bold mb-4">Edit Doctor</h2>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                name="name"
                value={editData.name}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                className="px-3 py-2 border rounded-lg"
              />
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={(e) => setEditData({ ...editData, email: e.target.value })}
                className="px-3 py-2 border rounded-lg"
              />
              <select
                name="role"
                value={editData.role}
                onChange={(e) => setEditData({ ...editData, role: e.target.value })}
                className="px-3 py-2 border rounded-lg"
              >
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setEditDoctor(null)}
                className="px-4 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteDoctorId && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#00000090] z-50">
          <div
            className={`rounded-xl shadow-lg p-6 w-full max-w-sm ${
              darkMode ? "bg-gray-900 text-gray-200" : "bg-white text-gray-800"
            }`}
          >
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this doctor?</p>
            <div className="flex justify-end mt-6 gap-4">
              <button
                onClick={() => setDeleteDoctorId(null)}
                className="px-4 py-2 rounded-lg bg-gray-400 text-white hover:bg-gray-500"
              >
                Cancel
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
      )}
    </div>
  );
};

export default DoctorCrudComponent;
