import { axiosInstance, baseURL } from "./axiosInstance";

export const getItem = async (groupId, itemId) => {
  try {
    const res = await axiosInstance.get(
      `${baseURL}/groups/${groupId}/${itemId}`
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const postItem = async (formData, groupId) => {
  try {
    const res = await axiosInstance.post(
      `${baseURL}/groups/${groupId}/addItem`,
      formData
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const putItem = async (formData, groupId, itemId) => {
  try {
    const res = await axiosInstance.put(
      `${baseURL}/groups/${groupId}/${itemId}`,
      formData
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
