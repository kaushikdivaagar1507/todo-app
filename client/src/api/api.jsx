import axios from "axios";

const API = axios.create({
  baseURL: "https://todo-app-963n.onrender.com/api/tasks",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.reload();
    }

    return Promise.reject(error);
  }
);

export default API;