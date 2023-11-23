import axios from "axios";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_HOST}`,
});

export default instance;
