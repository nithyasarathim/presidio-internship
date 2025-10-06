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
  const [editDoctorId, setEditDoctorId] = useState(null);
  const [editDoctorData, setEditDoctorData] = useState({ name: "", email: "", password: "", role: "doctor" });
  const [deleteDoctorId, setDeleteDoctorId] = useState(null); // for modal

  // Load all doctors
  const loadDoctors = async () => {
    if (!token) return toast.error("Not authorized");
    setLoading(true);
    try {
      const data = await fetchDoctors(token);
      setDoctors(data);
    } catch (err) {
      toast.error("Failed to load doctors");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDoctors();
  }, [token]);

  // Create new doctor
  const handleCreate = async () => {
    if (!token) return toast.error("Not authorized");
    try {
      await createDoctor(token, newDoctor);
      toast.success("Doctor created");
      setNewDoctor({ name: "", email: "", password: "", role: "doctor" });
      loadDoctors();
    } catch (err) {
      toast.error("Failed to create doctor");
      console.error(err);
    }
  };

  // Delete doctor
  const handleDelete = async (id) => {
    if (!token) return toast.error("Not authorized");
    try {
      await deleteDoctor(token, id);
      toast.success("Doctor deleted");
      setDeleteDoctorId(null);
      loadDoctors();
    } catch (err) {
      toast.error("Failed to delete doctor");
      console.error(err);
    }
  };

  // Start editing a doctor
  const handleEdit = (doctor) => {
    setEditDoctorId(doctor._id);
    setEditDoctorData({ ...doctor, password: "" });
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditDoctorId(null);
    setEditDoctorData({ name: "", email: "", password: "", role: "doctor" });
  };

  // Update doctor
  const handleUpdate = async () => {
    if (!token) return toast.error("Not authorized");
    try {
      await updateDoctor(token, editDoctorId, editDoctorData);
      toast.success("Doctor updated");
      setEditDoctorId(null);
      loadDoctors();
    } catch (err) {
      toast.error("Failed to update doctor");
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Create New Doctor */}
      <div className={`p-4 rounded ${darkMode ? "bg-gray-800 text-white border border-gray-700" : "bg-white border border-gray-200"}`}>
        <h3 className="font-semibold mb-3 text-lg">Add New Doctor</h3>
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            placeholder="Name"
            value={newDoctor.name}
            onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
            className="px-3 py-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={newDoctor.email}
            onChange={(e) => setNewDoctor({ ...newDoctor, email: e.target.value })}
            className="px-3 py-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={newDoctor.password}
            onChange={(e) => setNewDoctor({ ...newDoctor, password: e.target.value })}
            className="px-3 py-2 border rounded"
          />
          <select
            value={newDoctor.role}
            onChange={(e) => setNewDoctor({ ...newDoctor, role: e.target.value })}
            className="px-3 py-2 border rounded"
          >
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={handleCreate} className="px-4 py-2 bg-blue-600 text-white rounded">Create</button>
        </div>
      </div>

      {/* Doctors Table */}
      {loading ? (
        <p>Loading doctors...</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className={darkMode ? "bg-gray-700 text-white" : "bg-gray-200"}>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Role</th>
              <th className="border px-2 py-1">Created At</th>
              <th className="border px-2 py-1">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc) => (
              <tr key={doc._id}>
                {editDoctorId === doc._id ? (
                  <>
                    <td className="border px-2 py-1">
                      <input
                        value={editDoctorData.name}
                        onChange={(e) => setEditDoctorData({ ...editDoctorData, name: e.target.value })}
                        className="px-2 py-1 border rounded w-full"
                      />
                    </td>
                    <td className="border px-2 py-1">
                      <input
                        value={editDoctorData.email}
                        onChange={(e) => setEditDoctorData({ ...editDoctorData, email: e.target.value })}
                        className="px-2 py-1 border rounded w-full"
                      />
                    </td>
                    <td className="border px-2 py-1">
                      <select
                        value={editDoctorData.role}
                        onChange={(e) => setEditDoctorData({ ...editDoctorData, role: e.target.value })}
                        className="px-2 py-1 border rounded w-full"
                      >
                        <option value="doctor">Doctor</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="border px-2 py-1">{new Date(doc.createdAt).toLocaleString()}</td>
                    <td className="border px-2 py-1 flex gap-2">
                      <button onClick={handleUpdate} className="px-2 py-1 bg-green-500 text-white rounded">Save</button>
                      <button onClick={handleCancelEdit} className="px-2 py-1 bg-gray-500 text-white rounded">Cancel</button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border px-2 py-1">{doc.name}</td>
                    <td className="border px-2 py-1">{doc.email}</td>
                    <td className="border px-2 py-1">{doc.role}</td>
                    <td className="border px-2 py-1">{new Date(doc.createdAt).toLocaleString()}</td>
                    <td className="border px-2 py-1 flex gap-2">
                      <button onClick={() => handleEdit(doc)} className="p-1 bg-yellow-500 text-white rounded">
                        <Edit2 size={16} />
                      </button>
                      <button onClick={() => setDeleteDoctorId(doc._id)} className="p-1 bg-red-500 text-white rounded">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Delete Confirmation Modal */}
      {deleteDoctorId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-800 text-white" : "bg-white border border-gray-200"}`}>
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this doctor?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setDeleteDoctorId(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteDoctorId)}
                className="px-4 py-2 bg-red-600 text-white rounded"
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
