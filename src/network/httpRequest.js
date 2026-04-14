import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("token");
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OWM5MzI2NzY3NDAxNDI3ZDk3ODUyOTkiLCJlbWFpbCI6ImFhYUBnbWFpbC5jb20iLCJpYXQiOjE3NzQ3OTMzMzgsImV4cCI6MTc3NTM5ODEzOH0.D7Mw4a8IYi0Bg-IpSchAZ8ZuhWTVoMOtr4OyQ5iGnGA";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
