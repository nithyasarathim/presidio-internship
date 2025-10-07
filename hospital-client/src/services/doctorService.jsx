import { createApi } from "./api";

const API_BASE = "/api";


export const fetchAnalytics = async (token) => {
  try {
    const api = createApi(token);
    const res = await api.get(`${API_BASE}/analytics`);
    console.log(res);
    return res.data;
  } catch (err) {
    throw err.response ? err.response.data : err;
  }
};

export const fetchDoctors = async (token) => {
  try {
    const api = createApi(token);
    const res = await api.get(`${API_BASE}/doctors`);
    return res.data.doctors || [];
  } catch (err) {
    throw err.response ? err.response.data : err;
  }
};

export const createDoctor = async (token, doctorData) => {
  try {
    const api = createApi(token);
    const res = await api.post(`${API_BASE}/doctors`, doctorData);
    return res.data.doctor;
  } catch (err) {
    throw err.response ? err.response.data : err;
  }
};

export const updateDoctor = async (token, doctorId, updatedData) => {
  try {
    const api = createApi(token);
    const res = await api.put(`${API_BASE}/doctors/${doctorId}`, updatedData);
    return res.data.doctor;
  } catch (err) {
    throw err.response ? err.response.data : err;
  }
};

export const deleteDoctor = async (token, doctorId) => {
  try {
    const api = createApi(token);
    const res = await api.delete(`${API_BASE}/doctors/${doctorId}`);
    return res.data;
  } catch (err) {
    throw err.response ? err.response.data : err;
  }
};
