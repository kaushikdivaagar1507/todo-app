import axios from "axios";

const API = axios.create({
  baseURL: "https://todo-app-963n.onrender.com/api/tasks",

});

export default API;