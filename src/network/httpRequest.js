import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("token");
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWJkNGQxN2EzNGVhMjhmZTY0OWY5OGEiLCJlbWFpbCI6ImJhb0BnbWFpbC5jb20iLCJpYXQiOjE3NzczNDk2NTUsImV4cCI6MTc3Nzk1NDQ1NX0.kK1BmI_64xRXcbko-2MMiWfRL7_FcHl3b6Z8HZttDHQ";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
