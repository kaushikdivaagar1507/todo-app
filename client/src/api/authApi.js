import axios from "axios";

const AUTH_API = axios.create({
  baseURL: "http://localhost:5000/api/auth",
});

export default AUTH_API;