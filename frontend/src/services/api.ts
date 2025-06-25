import axios, { AxiosInstance } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: "https://blockBuster.local/api/v1/",
  timeout: 5000,
});
