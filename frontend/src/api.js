import axios from "axios";

const API = axios.create({
  baseURL: "https://todo-sd5r.onrender.com/api",
  timeout: 5000
});

// attach token if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
