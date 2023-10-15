import { axiosInstance, baseURL } from "./axiosInstance";

export const getNotifications = async () => {
  try {
     const res = await axiosInstance.get(`${baseURL}/getNotifications`);
     return res.data.result;
  } catch(err) {
    console.error(err)
  }
}

export const readNotification = async (notiId) => {
  try {
    const res = await axiosInstance.post(`${baseURL}/readNotification`, notiId);
    return res.data;
  } catch (err) {
    console.error(err);
  }
}

export const addNotification = async (addNotiData) => {
  try {
    const res = await axiosInstance.post(
      `${baseURL}/addNotifications`,
      addNotiData
    );
    return res.data;
  } catch(err) {
    console.error(err);
  }
}

export const getAllNotifications = async () => {
  try {
    const res = await axiosInstance.get(`${baseURL}/getAllNotifications`);
    return res.data.result;
  } catch (err) {
    console.error(err);
  }
};