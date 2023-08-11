import ApiManager from "./ApiManager";
import * as SecureStore from "expo-secure-store";

export const userLogin = async (body) => {
  try {
    const response = await ApiManager("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: { ...body },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const registerUser = async (body) => {
  try {
    const response = await ApiManager("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: { ...body },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const UpdateUserProfile = async (body) => {
  try {
    const UserData = await SecureStore.getItemAsync("UserData");

    const { token } = JSON.parse(UserData);

    const response = await ApiManager("/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: { ...body },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const UpdateUserProfileAvatar = async (body) => {
  try {
    const UserData = await SecureStore.getItemAsync("UserData");

    const { token } = JSON.parse(UserData);

    const FormData = global.FormData;
    const formData = new FormData();
    formData.append("avatar", body);

    const response = await ApiManager("/profile/user/avatar", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      transformRequest: (data, headers) => {
        // !!! override data to return formData
        // since axios converts that to string
        return formData;
      },
      data: formData,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
