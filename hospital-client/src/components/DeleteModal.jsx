import React from "react";

const DeleteModal = ({ darkMode, setDeleteDoctorId, handleDelete }) => (
  <div className="fixed inset-0 bg-[#00000090] flex justify-center items-center z-50">
    <div className={`p-6 rounded-lg ${darkMode ? "bg-gray-800 text-white" : "bg-white border border-gray-200"}`}>
      <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
      <p className="mb-6">Are you sure you want to delete this doctor?</p>
      <div className="flex justify-end gap-4">
        <button onClick={() => setDeleteDoctorId(null)} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
        <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
      </div>
    </div>
  </div>
);

export default DeleteModal;
