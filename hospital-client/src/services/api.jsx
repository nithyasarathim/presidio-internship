import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export const createApi = (token) => {
  return axios.create({
    baseURL,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  });
};
