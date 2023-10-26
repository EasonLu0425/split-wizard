import { axiosInstance, baseURL } from "./axiosInstance";

export const apiLogin = async ({ account, password }) => {
  try {
    const apiLoginRes = await axiosInstance.post(`${baseURL}/login`, {
      account,
      password,
    });
    return apiLoginRes;
  } catch (error) {
    console.error("[Login Failed]:", error);
    return error.response;
  }
};

export const apiRegister = async ({
  name,
  account,
  password,
  passwordCheck,
}) => {
  try {
    const apiRegisterRes = await axiosInstance.post(`${baseURL}/register`, {
      name,
      account,
      password,
      passwordCheck,
    });
    return apiRegisterRes
  } catch (error) {
    console.error("[Register Failed]", error);
    return error
  }
};

export const checkPermission = async (authToken) => {
  try {
    const response = await axiosInstance.get(`${baseURL}/test-token`, {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    });
    return response.data.status;
  } catch (error) {
    console.error("[Check Permission Failed]:", error);
  }
};
