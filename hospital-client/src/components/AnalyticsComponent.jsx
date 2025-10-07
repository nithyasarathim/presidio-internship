import React, { useContext } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import UserContext from "../context/UserContext";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const AnalyticsComponent = ({ data }) => {
  const { darkMode } = useContext(UserContext);
  const { analytics } = data;

  if (!analytics) return <p className={darkMode ? "text-white" : "text-gray-800"}>No analytics data available</p>;

  const ageGroupData = Object.entries(analytics.ageGroups || {}).map(([ageGroup, count]) => ({
    ageGroup,
    count,
  }));

  const recentPatients = (analytics.recentPatients || []).map((p) => ({
    ...p,
    doctorName: p.doctor?.name || "N/A",
  }));

  const cardClass = `p-6 rounded-lg shadow-lg ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`;

  return (
    <div className="space-y-10 font-semibold text-center ">
      <div className={` ${darkMode ? "text-white" : "text-gray-900"}`}>
        Current Patients count : <p className={`font-bold text-2xl rounded-full px-3 py-2 my-4 w-fit m-auto ${darkMode?"bg-sky-300 text-black":"bg-gray-600 text-white"}`}>{analytics.totalPatients}</p> 
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className={cardClass}>
          <h2 className="text-xl font-semibold mb-4">Patients by Age Group</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={ageGroupData}
                dataKey="count"
                nameKey="ageGroup"
                cx="50%"
                cy="50%"
                outerRadius={90}
                fill="#8884d8"
                label={{ fill: darkMode ? "#fff" : "#000" }}
              >
                {ageGroupData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className={cardClass}>
          <h2 className="text-xl font-semibold mb-4">Patients per Doctor</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.patientsPerDoctor}>
              <XAxis dataKey="doctor" stroke={darkMode ? "#fff" : "#000"} />
              <YAxis stroke={darkMode ? "#fff" : "#000"} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={cardClass}>
        <h2 className="text-xl font-semibold mb-4">Recent Patients</h2>
        <div className="overflow-x-auto">
          <table className={`min-w-full table-auto border-collapse border ${darkMode ? "border-gray-600" : "border-gray-300"}`}>
            <thead>
              <tr className={`${darkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900"}`}>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Age</th>
                <th className="border px-4 py-2">Doctor</th>
              </tr>
            </thead>
            <tbody>
              {recentPatients.map((p) => (
                <tr key={p._id} className={`hover:${darkMode ? "bg-gray-600" : "bg-gray-100"}`}>
                  <td className="border px-4 py-2">{p.name}</td>
                  <td className="border px-4 py-2">{p.email}</td>
                  <td className="border px-4 py-2">{p.age}</td>
                  <td className="border px-4 py-2">{p.doctorName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsComponent;
