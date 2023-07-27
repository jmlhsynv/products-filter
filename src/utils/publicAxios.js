import axios from "axios";

const api = import.meta.env.VITE_API_URL;

axios.defaults.baseURL = api;

export const publicAxios = axios.create({
  headers: {
    "Content-Type": "application/json",
    "Accept-Language": "az",
  },
});
