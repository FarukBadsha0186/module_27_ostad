import axios from "axios";

const API = axios.create({

 // baseURL: "http://localhost:5000/api", // backend port
   // baseURL: "https://module-27-ostad.onrender.com/api",
    baseURL: "https://module-27-ostad.onrender.com/api",

});

// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }
//   return req;
// });


API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});








export default API;