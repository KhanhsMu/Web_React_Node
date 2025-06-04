import axios from "./axiosToken";

const API = "http://localhost:8000/episode";

export const getEpisodesByMovie = (movieId) => axios.get(`${API}/${movieId}`);
export const getEpisodeById = (episodeId) =>axios.get(`${API}/watch/${episodeId}`);
export const createEpisode = async (formData) =>{return axios.post(`${API}/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });}
export const updateEpisode = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteEpisode = (id) => axios.delete(`${API}/${id}`);