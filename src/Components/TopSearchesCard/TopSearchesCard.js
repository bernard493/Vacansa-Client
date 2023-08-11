import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

const TopSearchesCard = ({ item }) => {
  const navigate = useNavigation();


  const  handleNavigation = ()=>{
    navigate.navigate("HotelDetails",{
      hotelId : item.id
    })
  }
  return (
    <TouchableOpacity onPress={handleNavigation} className="my-2">
      <View className="flex-row items-center justify-start space-x-3 py-3">
        <View>
          <Image
            source={{
              uri: item.image[0],
            }}
            style={styles.image}
            className="rounded-xl"
          />
        </View>
        <View className="space-y-2">
          <Text className="text-gray-700 font-bold text-md">{item.name}</Text>
          <View className="flex-row items-start justify-start space-x-1">
            <Text className="text-orange-400 font-semibold">5 rooms left</Text>
          </View>
          <View className="flex-row justify-between items-center space-x-7">
            <View>
              <Text className="text-gray-400 text-[12px] font-semibold">
                Start From ₵{item.startPrice} per night
              </Text>
            </View>
            <View className="flex-row items-center justify-center space-x-1 bg-white rounded-xl  p-1">
              <Ionicons name="star" size={15} color={"#FFD700"} />
              <Text className="text-gray-600 font-bold ">{item.rating}</Text>
            </View>
          </View>
        </View>
      </View>
      <View className="h-0.5 w-full bg-gray-200" />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 80,
  },
});
export default TopSearchesCard;
