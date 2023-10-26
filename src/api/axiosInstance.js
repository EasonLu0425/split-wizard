import axios from "axios";

// const baseURL = "http://localhost:5000/splitWizard";
const baseURL =
  process.env.NODE_ENV === "production"
    ? "http://ec2-13-113-48-51.ap-northeast-1.compute.amazonaws.com:8080"
    : "http://localhost:8080";
// const baseURL = "http://192.168.18.7:8080";

const axiosInstance = axios.create({
  withCredentials: true,
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error(error);
  }
);

export { axiosInstance, baseURL };
