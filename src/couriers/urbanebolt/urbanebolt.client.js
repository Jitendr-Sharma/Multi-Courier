import axios from "axios";

const urbaneboltClient = axios.create({
  baseURL: process.env.URBANEBOLT_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default urbaneboltClient;