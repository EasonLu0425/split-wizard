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

export const getOverView = async (groupId) => {
  try {
    const res = await axiosInstance.get(`${baseURL}/groups/${groupId}/overView`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
