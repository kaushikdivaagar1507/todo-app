import axios from "axios";

const API = axios.create({
  baseURL: "https://todo-app-963n.onrender.com/api/tasks",
});


// ========================================
// ATTACH JWT TOKEN
// ========================================

API.interceptors.request.use(
  (config) => {

    const token = sessionStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);


// ========================================
// HANDLE UNAUTHORIZED REQUESTS
// ========================================

API.interceptors.response.use(
  (response) => response,

  (error) => {

    if (error.response?.status === 401) {

      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");

      window.location.reload();
    }

    return Promise.reject(error);
  }
);


export default API;