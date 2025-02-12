import axios from "axios";

const url = "https://heynow-chat.onrender.com"

const instance = axios.create({
  baseURL: url,
  withCredentials: true,
});

export default instance;
