import ApiManager from "./ApiManager";
import * as SecureStore from "expo-secure-store";

export const getAllPopularHotels = async () => {
  try {
    const UserData = await SecureStore.getItemAsync("UserData");

    const { token } = JSON.parse(UserData);

    const response = await ApiManager("/hotels/popular-hotels", {
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



export const getHotelById = async (hotel_id) => {
  try {
    const UserData = await SecureStore.getItemAsync("UserData");

    const { token } = JSON.parse(UserData);

    const response = await ApiManager(`/hotels/${hotel_id}`, {
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


export const getRoomById = async (room_id) => {
  try {
    const UserData = await SecureStore.getItemAsync("UserData");

    const { token } = JSON.parse(UserData);

    const response = await ApiManager(`/room/by/${room_id}`, {
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


export const getHotelRoomsById = async (hotel_id) => {
  try {
    const UserData = await SecureStore.getItemAsync("UserData");

    const { token } = JSON.parse(UserData);

    const response = await ApiManager(`/room/availablerooms/${hotel_id}`, {
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