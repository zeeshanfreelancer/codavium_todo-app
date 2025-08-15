import axios from "axios";

const API_URL =
  import.meta?.env?.VITE_API_URL || // For Vite
  "http://localhost:5000";           // Fallback for local dev

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true // needed if you use cookies/sessions
});

export default axiosInstance;
