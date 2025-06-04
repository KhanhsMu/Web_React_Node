import axios from "./axiosToken";
const API = "http://localhost:8000/auth";

export const getAllUsers = () => axios.get(`${API}/Admin`); 
export const deleteUser = (email) => axios.delete(`${API}/${email}`); 
export const updateUserRole = (id, data) => axios.put(`${API}/${id}`, data); 
export const getMe = () => axios.get('${API}/me');
export const getUserDetail = (email) => axios.get(`${API}/${email}`);
export const updateProfile = (id, data) => axios.put(`${API}/${id}`, data);

