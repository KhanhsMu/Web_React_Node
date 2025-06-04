import axios from "./axiosToken";

const API_URL = "http://localhost:8000/view"

export const increaseView = (episodeId) =>axios.post(`${API_URL}/${episodeId}`)
export const totalView = (movieId) => axios.get(`${API_URL}/total/${movieId}`)
export const AllView = () => axios.get(`${API_URL}/all`); 

