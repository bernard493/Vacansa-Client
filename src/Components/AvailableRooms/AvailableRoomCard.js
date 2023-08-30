import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import COLORS from "../../constants/style"
const AvailableRoomCard = ({ item, toggle }) => {
  const {
    _id,
    roomTitle,
    image,
    bed,
    guests,
    wifi,
    squareMeter,
    price,
    discountPer,
  } = item;
  return (
    <View className="p-3 m-3">
      <View className="flex-row items-center justify-start space-x-2">
        <Image
          source={{
            uri: image[0],
          }}
          className=" rounded-lg"
          style={styles.image}
        />
        <View className="space-y-2">
          <Text className="text-gray-800 font-semibold text-[13px] w-[190px]">
            {roomTitle}
          </Text>
          <View className="space-y-2">
            <View className="flex-row items-center justify-start space-x-4">
              <View className="flex-row items-center justify-start space-x-2">
                <Ionicons name="bed-outline" size={22} color={"black"} />
                <Text className="text-gray-500">{bed}</Text>
              </View>
              <View className="flex-row items-center justify-start space-x-2">
                <Ionicons name="people-outline" size={22} color={"black"} />
                <Text className="text-gray-500">{guests} Guests</Text>
              </View>
            </View>
            <View className="flex-row items-center justify-start space-x-4">
              <View className="flex-row items-center justify-start space-x-2">
                <Ionicons name="wifi-outline" size={22} color={"black"} />
                <Text className="text-gray-500">
                  {wifi ? "Wifi" : " No Wifi"}
                </Text>
              </View>
              <View className="flex-row items-center justify-start space-x-2">
                <Ionicons
                  name="tablet-landscape-outline"
                  size={22}
                  color={"#000000"}
                />
                <Text className="text-gray-500">{squareMeter}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <View className="py-2 flex-row items-center justify-between">
        <View className="space-y-1">
          <View className="flex-row  space-x-1">
            <Text className={`text-md font-bold text-[${COLORS.primary}]`}>GH¢ {price}</Text>
            {discountPer && (
              <Text className="text-[10px] font-bold text-gray-400 line-through">
                GH¢ {price * (discountPer / 100)}
              </Text>
            )}
          </View>
          <Text className="text-gray-700 font-semibold">
            per room per night
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => toggle(_id)}
          className={`py-3 px-4 bg-[${COLORS.primary}] rounded-lg`}
        >
          <Text className="text-white">Choose</Text>
        </TouchableOpacity>
      </View>
      <View className="w-full border-t-2 border-gray-200" />
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
  },
});
export default AvailableRoomCard;
