import axios from "./axiosToken";
const API = "http://localhost:8000/category";

export const getAllCategories = () => axios.get(API);
export const getCategoryById = (id) => axios.get(`${API}/${id}`);
export const createCategory = (data) => axios.post(API, data);
export const updateCategory = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteCategory = (id) => axios.delete(`${API}/${id}`);
export const getMoviesByCategory = (categoryName) => {
  return axios.get(`${API_URL}/${categoryName}`);
};