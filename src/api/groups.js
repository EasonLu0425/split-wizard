import axios from 'axios'

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

export const getGroups = async () => {
  try {
    const res = await axiosInstance.get(`${baseURL}/groups`)
    return res.data
  } catch(err) {
    console.error("[Get Groups failed]: ", err);
  }
}

export const addGroup = async (formData) => {
  try {
    const res = await axiosInstance.post(`${baseURL}/addGroup`, formData)
    return res.data
  } catch(err){
    console.error("[Add Group failed]:", err);
  }
}

export const getGroup = async (groupId) => {
  try {
    const res = await axiosInstance.get(`${baseURL}/groups/${groupId}`);
    return res.data
  } catch(err) {
    console.error("[Find Group failed]:", err);
  }
}