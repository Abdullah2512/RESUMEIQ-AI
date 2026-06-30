import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api"
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("resumeiq_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Request never reached the server: wrong VITE_API_URL, server down, or CORS-blocked
      return Promise.reject(
        new Error("Could not reach the server. Please check your connection and try again.")
      );
    }
    const message = error.response?.data?.message || "Request failed";
    return Promise.reject(new Error(message));
  }
);