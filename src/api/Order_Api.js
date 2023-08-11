import ApiManager from "./ApiManager";
import * as SecureStore from "expo-secure-store";



export const createOrder = async (body) => {
  try {
    const UserData = await SecureStore.getItemAsync("UserData");

    const { token } = JSON.parse(UserData);

    const response = await ApiManager("/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: { ...body },
    });
    return response
  } catch (error) {
    return error.response;
  }
};



export const getAllOrders = async (body) => {
  try {
    const UserData = await SecureStore.getItemAsync("UserData");

    const { token } = JSON.parse(UserData);

    const response = await ApiManager("/order/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    
    });
    return response
  } catch (error) {
    return error.response;
  }
};
