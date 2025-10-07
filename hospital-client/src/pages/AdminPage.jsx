import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import toast from "react-hot-toast";
import { fetchAnalytics, fetchDoctors } from "../services/doctorService";
import AnalyticsComponent from "../components/AnalyticsComponent";
import DoctorListComponent from "../components/DoctorListComponent";

const AdminPage = () => {
  const { token, darkMode, name, email } = useContext(UserContext);

  const [activeTab, setActiveTab] = useState("analytics");
  const [analyticsData, setAnalyticsData] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadAnalytics = async () => {
    if (!token) return;
    setLoading(true);
    try {
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
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} min-h-screen px-4 sm:px-6 md:px-10 lg:px-20`}>
      <header className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center border-b gap-2 sm:gap-0">
        <h1 className="text-lg sm:text-xl md:text-xl md:hidden font-semibold">Admin Dashboard</h1>
        <h1 className="text-lg hidden md:block sm:text-xl md:text-2xl font-semibold">Administrator Dashboard</h1>
        <p className="text-sm sm:text-base flex items-center gap-1 sm:gap-2">
          <span className="text-xs sm:text-sm font-medium">Welcome</span>
          <span className="text-sm sm:text-base font-semibold">{name}!</span>
          <span className="hidden lg:inline">({email})</span>
        </p>
        <div className="flex flex-wrap gap-1 mt-2 sm:mt-0">
          <button
            onClick={() => setActiveTab("analytics")}
            className={`px-3 py-2 rounded ${activeTab === "analytics" ? "bg-sky-500 text-white" : "bg-gray-200 text-black"} transition text-sm sm:text-base`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab("doctors")}
            className={`px-3 py-2 rounded ${activeTab === "doctors" ? "bg-sky-500 text-white" : "bg-gray-200 text-black"} transition text-sm sm:text-base`}
          >
            Doctor Management
          </button>
        </div>
      </header>

      <main className="p-4 sm:p-6">
        {loading ? (
          <p className="text-center py-6">Loading...</p>
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
