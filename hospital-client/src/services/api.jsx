import axios from "axios";

const baseURL = "https://hospital-api-a7h9fjbwaph6hzc0.centralindia-01.azurewebsites.net/";

export const createApi = (token) => {
  return axios.create({
    baseURL,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  });
};
