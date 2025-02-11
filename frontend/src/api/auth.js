import axios from "./axios";

const API = import.meta.env.VITE_BACKEND_URL || "http://localhost:3010/api";

export const registerRequest = (user) => axios.post(`/register`, user);

export const loginRequest = (user) => axios.post(`/login`, user);

export const verifyTokenRequest = () => axios.get("/verify");
