import axios from "axios";

const authURL = "http://localhost:5000/splitWizard";
// const authURL = "http://localhost:8081/splitwizard-SP-0.1";

export const login = async ({ account, password }) => {
  try {
    const { data } = await axios.post(`${authURL}/login`, {
      account,
      password,
    });
    const { authToken } = data;
    if (authToken) {
      return { success: true, ...data };
    }
    return data;
  } catch (error) {
    console.error("[Login Failed]:", error);
  }
};

export const register = async ({ account, email, password }) => {
  try {
    const { data } = await axios.post(`${authURL}/register`, {
      account,
      email,
      password,
    });
    const { authToken } = data;
    if (authToken) {
      return { success: true, ...data };
    }
    return data;
  } catch (error) {
    console.error("[Register Failed]", error);
  }
};

// export const checkPermission = async (authToken) => {
//   try {
//     const response = await axios.get(`${authURL}/test-token`, {
//       headers: {
//         Authorization: "Bearer " + authToken,
//       },
//     });
//     return response.data.success;
//   } catch (error) {
//     console.error("[Check Permission Failed]:", error);
//   }
// };

export const checkPermission = async () => {
  try {

  } catch(err) {
    console.error(err)
  }
}