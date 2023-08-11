import ApiManager from "./ApiManager";
import * as SecureStore from "expo-secure-store";

export const getAllHotelReviews = async (hotel_id) => {
  try {
    const UserData = await SecureStore.getItemAsync("UserData");

    const { token } = JSON.parse(UserData);

    const response = await ApiManager(`/review/get-review/${hotel_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    return error.response;
  }
};
