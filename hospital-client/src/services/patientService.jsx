
import { createApi } from "./api";

export const fetchPatients = async (token,page=1,limit=5,sort="createdAt_desc")=>{
  try {
    const api=createApi(token);
    const res = await api.get("/api/patients",{
      params: {page,limit,sort},
    });
    return res.data;
  } catch (err) {
    throw err.response ? err.response.data : err;
  }
};
