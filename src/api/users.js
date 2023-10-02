import { axiosInstance, baseURL } from "./axiosInstance";

export const getAllUsers = async () => {
  try {
    const res = await axiosInstance.get(`${baseURL}/allMembers`);
    return res.data;
  } catch (err) {
    console.err("[Get allUsers failed]: ", err);
  }
};
