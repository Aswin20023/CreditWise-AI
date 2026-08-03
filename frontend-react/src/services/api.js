import axios from "axios";

const api = axios.create({
  baseURL: "https://creditwise-ai-4i4b.onrender.com",
  timeout: 60000, // 60 seconds
  headers: {
    Accept: "application/json",
  },
});

export default api;