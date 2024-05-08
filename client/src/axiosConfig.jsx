import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || "http://localhost:3001",
});

// attach token to headers for authenticated requests
instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Append token to headers
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;
