import axios, { AxiosInstance } from "axios";

export const api: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/v1",
  timeout: 5000,
});
