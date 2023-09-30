import axios from "axios";

const baseURL = "http://localhost:5000/splitWizard";
// const baseURL = "http://localhost:8081/splitwizard-SP-0.1";

const axiosInstance = axios.create({
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

export const getAllUsers = async () => {
  try {
    const res = await axiosInstance.get(`${baseURL}/allMembers`);
    return res.data;
  } catch (err) {
    console.err("[Get allUsers failed]: ", err);
  }
};