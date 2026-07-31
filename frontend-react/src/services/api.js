import axios from "axios";

const api = axios.create({
  baseURL: "https://creditwise-ai-4i4b.onrender.com",
  timeout: 10000,
});

export default api;