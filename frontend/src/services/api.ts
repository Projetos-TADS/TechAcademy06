import axios, { AxiosInstance } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URI || "https://blockbuster.local/v1",
  timeout: 5000,
});
