// src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api", // URL de tu backend
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // si necesitas cookies
});

export default api;
