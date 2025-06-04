import axios from "./axiosToken";

const API = "http://localhost:8000/comment";


export const createComment = (data) => axios.post(`${API}`, data);
export const updateComment = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteComment = (id) => axios.delete(`${API}/${id}`);
export const getCommentsByMovie = (movieId) => axios.get(`${API}/${movieId}`);
// export const getMovieById = (id) => axios.get(`${API}/movie/${id}`);
