import { axiosInstance, baseURL } from "./axiosInstance";

export const postItemDetails = async (formData, groupId, newItemId) => {
  try {
    const res = await axiosInstance.post(
      `${baseURL}/groups/${groupId}/${newItemId}/addItemDetails`,
      formData
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const putItemDetails = async (formData, groupId, itemId) => {
  try {
    const res = await axiosInstance.put(
      `${baseURL}/groups/${groupId}/${itemId}/editItemDetails`,
      formData
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const deleteItemDetails = async (groupId, itemId) => {
  try {
    const res = await axiosInstance.delete(
      `${baseURL}/groups/${groupId}/${itemId}/details`);
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const getUserInGroupDetails = async (groupId, userId) => {
  try {
    const res = await axiosInstance.get(
      `${baseURL}/groups/${groupId}/${userId}/details`
    );
    return res.data.result;
  } catch (err) {
    console.error(err);
  }
};