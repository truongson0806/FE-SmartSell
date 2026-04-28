import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("token");
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWJkNGQxN2EzNGVhMjhmZTY0OWY5OGEiLCJlbWFpbCI6ImJhb0BnbWFpbC5jb20iLCJpYXQiOjE3NzYwOTM4MjksImV4cCI6MTc3NjY5ODYyOX0.UdSeB1Tke3xk1MDaXDn9iyC5aCVijs7Rf7IA6vAnHA8";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
