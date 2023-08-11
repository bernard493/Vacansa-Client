import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const PopularHotelCard = ({ item }) => {
  const navigate = useNavigation();
  const { hotel } = item;

  const handleNavigation = () => {
    navigate.navigate("HotelDetails", {
      hotelId: hotel._id,
    });
  };

  return (
    <TouchableOpacity  onPress={handleNavigation} className="m-3 space-y-3">
      <View className=" relative">
        <Image
          source={{
            uri: hotel.image[0],
          }}
          style={styles.image}
          className="rounded-xl"
        />
        <View className="flex-row items-center justify-start space-x-1 bg-white rounded-xl absolute top-3 left-3 p-1">
          <Ionicons name="star" size={15} color={"#FFD700"} />
          <Text className="text-gray-600 font-semibold">{6}</Text>
        </View>
      </View>
      <View className="space-y-2">
        <Text className="text-gray-700 font-bold text-md">{hotel.name}</Text>
        <Text className="text-gray-400 text-[12px] font-semibold">
          Starts from GH₵ {hotel.startPrice} per night
        </Text>
        <View className="flex-row items-center justify-between ">
          <View className="flex-row items-center justify-start space-x-1">
            <Ionicons name="location" size={20} color={"#12C6FF"} />
            <Text className="text-gray-500  text-[12px]">{hotel.address}</Text>
          </View>
          <View>
            {hotel.favorite ? (
              <View className="p-1 bg-green-300 rounded-lg">
                <Ionicons name="bookmark" size={20} color={"#32CD32"} />
              </View>
            ) : (
              <View className="p-1 bg-gray-100 rounded-lg">
                <Ionicons name="bookmark-outline" size={20} color={"#FFD700"} />
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 210,
    height: 150,
  },
});
export default PopularHotelCard;
