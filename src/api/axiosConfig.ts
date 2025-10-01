import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/api", // Ajusta según tu backend
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
