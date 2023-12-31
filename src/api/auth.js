import { axiosInstance } from "./axiosInstance";

const authURL = "http://localhost:5000/splitWizard";
// const authURL = "http://localhost:8081/splitwizard-SP-0.1";

export const apiLogin = async ({ account, password }) => {
  try {
    const { data } = await axiosInstance.post(`${authURL}/login`, {
      account,
      password,
    });
    const { authToken } = data.result;
    if (authToken) {
      return { success: true, ...data };
    }
    return data;
  } catch (error) {
    console.error("[Login Failed]:", error);
  }
};

export const apiRegister = async ({ name, account, password, passwordCheck }) => {
  try {
    const { data } = await axiosInstance.post(`${authURL}/register`, {
      name,
      account,
      password,
      passwordCheck
    });
    console.log(data)
    const { authToken } = data.result;
    if (authToken) {
      return { success: true, ...data };
    }
    return data;
  } catch (error) {
    console.error("[Register Failed]", error);
  }
};

export const checkPermission = async (authToken) => {
  try {
    const response = await axiosInstance.get(`${authURL}/test-token`, {
      headers: {
        Authorization: "Bearer " + authToken,
      },
    });
    return response.data.status;
  } catch (error) {
    console.error("[Check Permission Failed]:", error);
  }
};
