import axios from "axios";
import { session } from "./sessionStorage";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  // const token = localStorage.getItem("token");
  const token = session.get("token");
  if (token) config.headers.Authorization = `${token}`;
  return config;
});

export default api;
