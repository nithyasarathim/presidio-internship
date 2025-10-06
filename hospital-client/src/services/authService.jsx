import React from 'react'
import useApi from './api.jsx'

export const login=async({email,password})=>{
    try{
        const api=useApi;
        const res=await api.post("/api/login",{email,password});
        return res.data;
    }catch(err){
        throw err.response? err.response.data: err;
    }
};