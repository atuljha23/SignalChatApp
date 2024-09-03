import axios from "axios";
import { HOST } from "./constants";

const apiClient = axios.create({
  baseURL: HOST,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
