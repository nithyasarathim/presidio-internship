import { createApi } from "./api";

export const createPatient = async (token, patientData) => {
  try {
    const api = createApi(token);
    const res = await api.post("/api/patients", patientData);
    return res.data;
  } catch (err) {
    throw err.response ? err.response.data : err;
  }
};

export const fetchPatients = async (
  token,
  page = 1,
  limit = 5,
  sort = "createdAt_desc",
  filter = ""
) => {
  try {
    const api = createApi(token);
    const params = { page, limit, sort };
    if (filter) params.filter = filter;

    const res = await api.get("/api/patients", { params });
    return res.data;
  } catch (err) {
    throw err.response ? err.response.data : err;
  }
};

export const updatePatient = async (token, id, data) => {
  try {
    const api = createApi(token);
    const res = await api.put(`/api/patients/${id}`, data);
    return res.data;
  } catch (err) {
    throw err.response ? err.response.data : err;
  }
};

export const deletePatient = async (token, id) => {
  try {
    const api = createApi(token);
    const res = await api.delete(`/api/patients/${id}`);
    return res.data;
  } catch (err) {
    throw err.response ? err.response.data : err;
  }
};
