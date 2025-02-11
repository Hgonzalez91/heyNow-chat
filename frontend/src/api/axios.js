import axios from "axios";

const url = import.meta.env.VITE_BACKEND_URL || "http://localhost:3010/api";

const instance = axios.create({
  baseURL: url,
  withCredentials: true,
});

export default instance;
