
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000", // hoặc process.env.API_URL
});

// Tự động đính kèm token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
