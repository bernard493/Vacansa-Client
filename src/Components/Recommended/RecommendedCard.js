import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const RecommendedCard = ({ item }) => {
  const navigate = useNavigation();
  const { hotel } = item;

  const handleNavigation = () => {
    navigate.navigate("HotelDetails", {
      hotelId: hotel._id,
    });
  };
  return (
    <TouchableOpacity
      key={hotel._id}
      onPress={handleNavigation}
      className="m-3 space-y-3"
    >
      <View className="flex-row items-center justify-center space-x-3">
        <View>
          <Image
            source={{
              uri: hotel.image[0],
            }}
            style={styles.image}
            className="rounded-xl"
          />
        </View>
        <View className="space-y-2">
          <Text className="text-gray-700 font-bold text-md">{hotel.name}</Text>
          <View className="flex-row items-start justify-start space-x-1">
            <View className="flex-row">
              <Ionicons name="arrow-back-outline" size={20} color={"#12C6FF"} />
              <Ionicons
                name="arrow-forward-outline"
                size={20}
                color={"#12C6FF"}
              />
            </View>

            <Text className="text-gray-400">14.3km</Text>
          </View>
          <View className="flex-row justify-center items-center space-x-1">
            <Text className="text-gray-400 text-[12px] font-semibold">
              From GH₵ {hotel.startPrice} per night
            </Text>
            {hotel?.rating && (
              <View className="flex-row items-center justify-start space-x-1 bg-white rounded-xl  p-1">
                <Ionicons name="star" size={15} color={"#FFD700"} />
                <Text className="text-gray-600 font-semibold">
                  {hotel?.rating}
                </Text>
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
    width: 110,
    height: 80,
  },
});
export default RecommendedCard;
