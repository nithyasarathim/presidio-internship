import React from "react";
import { Edit2, Trash2 } from "lucide-react";

const DoctorRow = ({ doc, editDoctorId, editDoctorData, setEditDoctorData, handleEdit, handleCancelEdit, handleUpdate, setDeleteDoctorId }) => {
  const isEditing = editDoctorId === doc._id;

  return (
    <tr>
      {isEditing ? (
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
          <td className="border px-2 py-1 w-[150px]">{doc.name}</td>
          <td className="border px-2 py-1 w-[200px]">{doc.email}</td>
          <td className="border px-2 py-1 w-[120px]">{doc.role}</td>
          <td className="border px-2 py-1 w-[180px]">{new Date(doc.createdAt).toLocaleString()}</td>
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
  );
};

export default DoctorRow;
