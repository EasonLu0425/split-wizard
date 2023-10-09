import { axiosInstance, baseURL } from "./axiosInstance";

export const createResult = async (groupId) => {
  try {
    const res = await axiosInstance.post(
      `${baseURL}/groups/${groupId}/createSettlements`
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const getResult = async (groupId) => {
  try {
    const res = await axiosInstance.get(
      `${baseURL}/groups/${groupId}/getResult`
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const switchStatus = async (groupId, resultId) => {
  try {
    const res = await axiosInstance.put(
      `${baseURL}/groups/${groupId}/switchResultStatus`,
      { id: resultId }
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
