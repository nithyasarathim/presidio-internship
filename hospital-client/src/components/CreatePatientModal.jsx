import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const CreatePatientModal = ({ token, darkMode, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    phone: "",
    dob: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { name, age, email, phone, dob } = formData;
    if (!name || !age || !email || !phone || !dob) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/patients",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Patient created successfully");
      onSuccess();
    } catch (err) {
      console.error(err);
      toast.error("Failed to create patient");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className={`p-6 rounded-xl w-full max-w-md ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}>
        <h2 className="text-xl font-bold mb-4">Create Patient</h2>
        <div className="flex flex-col gap-3">
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="px-3 py-2 border rounded-lg"/>
          <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} className="px-3 py-2 border rounded-lg"/>
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="px-3 py-2 border rounded-lg"/>
          <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="px-3 py-2 border rounded-lg"/>
          <input type="date" name="dob" placeholder="DOB" value={formData.dob} onChange={handleChange} className="px-3 py-2 border rounded-lg"/>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-400 hover:bg-gray-500 text-white">Cancel</button>
          <button onClick={handleSubmit} disabled={loading} className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white">{loading ? "Creating..." : "Create"}</button>
        </div>
      </div>
    </div>
  );
};

export default CreatePatientModal;
