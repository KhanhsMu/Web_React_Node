import axios from "./axiosToken";

const API_URL = "http://localhost:8000/movie"

export const getAllMovies = () => axios.get(API_URL);
export const createMovie = (movie) => axios.post(API_URL, movie);
export const updateMovie = (id, movie) => axios.put(`${API_URL}/${id}`, movie);
export const deleteMovie = (id) => axios.delete(`${API_URL}/${id}`);
export const getMovieById = (id) => axios.get(`${API_URL}/${id}`);
export const searchMovies = (query) => axios.get(`${API_URL}/search?q=${encodeURIComponent(query)}`);
