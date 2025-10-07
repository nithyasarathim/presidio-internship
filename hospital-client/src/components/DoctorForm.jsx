import React from "react";

const DoctorForm = ({ darkMode, doctorData, setDoctorData, handleSubmit, submitLabel }) => (
  <div className={`p-4 rounded ${darkMode ? "bg-gray-800 text-white border border-gray-700" : "bg-white border border-gray-200"}`}>
    <h3 className="font-semibold mb-3 text-lg">{submitLabel}</h3>
    <div className="flex flex-wrap gap-2">
      <input
        type="text"
        placeholder="Name"
        value={doctorData.name}
        onChange={(e) => setDoctorData({ ...doctorData, name: e.target.value })}
        className="px-3 py-2 border rounded w-[150px]"
      />
      <input
        type="email"
        placeholder="Email"
        value={doctorData.email}
        onChange={(e) => setDoctorData({ ...doctorData, email: e.target.value })}
        className="px-3 py-2 border rounded w-[200px]"
      />
      <input
        type="password"
        placeholder="Password"
        value={doctorData.password}
        onChange={(e) => setDoctorData({ ...doctorData, password: e.target.value })}
        className="px-3 py-2 border rounded w-[150px]"
      />
      <select
        value={doctorData.role}
        onChange={(e) => setDoctorData({ ...doctorData, role: e.target.value })}
        className="px-3 py-2 border rounded w-[120px]"
      >
        <option value="doctor">Doctor</option>
        <option value="admin">Admin</option>
      </select>
      <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded">{submitLabel}</button>
    </div>
  </div>
);

export default DoctorForm;
