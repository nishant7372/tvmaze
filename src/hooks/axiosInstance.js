import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.tvmaze.com",
  timeout: 8000,
});

export default axiosInstance;
