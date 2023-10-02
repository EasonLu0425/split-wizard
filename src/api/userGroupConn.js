import { axiosInstance, baseURL } from "./axiosInstance";

export const addMemberToGroup = async (addData) => {
  try {
    const res = await axiosInstance.post(
      `${baseURL}/addMemberToGroup`,
      addData
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
