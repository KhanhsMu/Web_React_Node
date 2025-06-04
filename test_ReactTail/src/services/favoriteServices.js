import axios from "./axiosToken";

const API = "http://localhost:8000/favorite";

export const getFavorite = (userId) => axios.get(`${API}/${userId}`)
export const deleteFavorite = (userId,movieId) => axios.delete(`${API}/delete`, {data: {userId, movieId}})
export const addFavorite = (userId, movieId) => axios.post(`${API}/`, {userId,movieId})


