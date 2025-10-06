import { createApi } from "./api";

export const LoginService = async ({ email, password }) => {
  try {
    const token="";
    const api = createApi(token);
    const res = await api.post("/api/auth/login", { email, password });
    return res.data;
  } catch (err) {
    throw err.response ? err.response.data : err;
  }
};
