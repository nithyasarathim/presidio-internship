import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import toast from "react-hot-toast";
import {
  fetchAnalytics,
  fetchDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
} from "../services/doctorService";
import AnalyticsComponent from "../components/AnalyticsComponent";
import DoctorListComponent from "../components/DoctorListComponent";

const AdminPage = () => {
  const { token, darkMode,name,email } = useContext(UserContext);

  const [activeTab, setActiveTab] = useState("analytics"); 
  const [analyticsData, setAnalyticsData] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadAnalytics = async () => {
    if (!token) return;
    setLoading(true);
    try {
      console.log(token);
      const data = await fetchAnalytics(token);
      setAnalyticsData(data);
    } catch (err) {
      toast.error("Failed to fetch analytics");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadDoctors = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await fetchDoctors(token);
      setDoctors(data);
    } catch (err) {
      toast.error("Failed to fetch doctors");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "analytics") loadAnalytics();
    else if (activeTab === "doctors") loadDoctors();
  }, [activeTab, token]);

  return (
    <div className={darkMode ? "bg-gray-900 text-white min-h-screen px-20" : "bg-white text-black min-h-screen px-20 "}>
      <header className="p-4 flex justify-between items-center border-b">
        <h1 className="text-2xl px-5 py-2">Administrator Dashboard</h1>
        <p className="text-sm flex items-center gap-2">Welcome<p className='text-xl font-semibold pr-3'>{name}!</p> ({email})</p>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-3 py-2 rounded ${activeTab === "analytics" ? "bg-sky-500 text-white" : "bg-gray-200 text-black"}`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab("doctors")}
            className={`px-3 py-2 rounded ${activeTab === "doctors" ? "bg-sky-500 text-white" : "bg-gray-200 text-black"}`}
          >
            Doctor Management
          </button>
        </div>
      </header>

      <main className="p-6">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {activeTab === "analytics" && analyticsData && (
              <AnalyticsComponent data={analyticsData} />
            )}
            {activeTab === "doctors" && (
              <DoctorListComponent doctors={doctors} reloadDoctors={loadDoctors} />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default AdminPage;
