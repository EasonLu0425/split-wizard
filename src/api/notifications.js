import { axiosInstance, baseURL } from "./axiosInstance";

export const getNotifications = async () => {
  try {
     const res = await axiosInstance.get(`${baseURL}/getNotifications`);
     return res.data.result;
  } catch(err) {
    console.error(err)
  }
}

export const readNotification = async (notiIdData) => {
  try {
    const res = await axiosInstance.post(`${baseURL}/readNotification`, notiIdData);
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