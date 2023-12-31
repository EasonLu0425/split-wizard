import {axiosInstance, baseURL} from "./axiosInstance";

export const getGroups = async () => {
  try {
    const res = await axiosInstance.get(`${baseURL}/groups`,)
    return res.data
  } catch(err) {
    console.error("[Get Groups failed]: ", err);
  }
}

export const addGroup = async (formData) => {
  try {
    const res = await axiosInstance.post(`${baseURL}/addGroup`, formData)
    return res.data
  } catch(err){
    console.error("[Add Group failed]:", err);
  }
}

export const getGroup = async (groupId) => {
  try {
    const res = await axiosInstance.get(`${baseURL}/groups/${groupId}`);
    return res.data.result
  } catch(err) {
    console.error("[Find Group failed]:", err);
  }
}

export const getGroupMembers = async (groupId) => {
  try {
    const res = await axiosInstance.get(`${baseURL}/groups/${groupId}/members`);
    return res.data
  } catch (err) {
    console.error(err)
  }
}

export const resetGroupRedirect = async (groupId) => {
  try {
    const res = await axiosInstance.put(`${baseURL}/groups/${groupId}/resetRedirect`);
    return res.data;
  } catch (err) {
    console.error("[reset group redirect failed]:", err);
  }
}

export const putArchive = async (groupId) => {
   try {
     const res = await axiosInstance.put(
       `${baseURL}/groups/${groupId}/setArchive`
     );
     return res.data;
   } catch (err) {
     console.error("[put Group archive failed]:", err);
   }
}