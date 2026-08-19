import axios from "axios";

const AUTH_API = axios.create({
  baseURL: "https://todo-app-963n.onrender.com/api/auth",
});

export default AUTH_API;