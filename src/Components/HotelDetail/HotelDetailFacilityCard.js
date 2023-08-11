import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const HotelDetailFacilityCard = ({ item }) => {
  const [iconName, setIconName] = useState("");

  useEffect(() => {
    if (item === "Restaurant") {
      setIconName("fast-food-outline");
    } else if (item === "Gym") {
      setIconName("bicycle-outline");
    } else if (item === "WiFi") {
      setIconName("wifi");
    } else if (item === "Packing") {
      setIconName("car-sport-outline");
    }
  },[item]);

  return (
    <View className="mx-4 flex items-center space-y-2">
      <View className=" p-3 border-2 border-gray-200 rounded-lg flex items-center">
        <Ionicons name={iconName} size={30} color={"#696969"} />
      </View>
      <Text className="text-gray-600 font-semibold text-[12px]">{item}</Text>
    </View>
  );
};

export default HotelDetailFacilityCard;
