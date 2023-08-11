import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import LottieView from "lottie-react-native";

const Favorite = ({ allFavorite }) => {
  const [text, onChangeText] = useState("");

  return (
    <View>
      <View className="flex-row items-center justify-center space-x-6">
        <View className="flex-row flex-1  items-center justify-start space-x-5 border-2 border-gray-300 rounded-lg p-2 ">
          <Ionicons name="search-outline" size={25} color={"gray"} />

          <TextInput
            className="w-full"
            onChangeText={onChangeText}
            value={text}
            placeholder="Search collections"
            keyboardType="default"
          />
        </View>
        <TouchableOpacity className=" items-center justify-center space-x-3 border-2 border-gray-300 rounded-lg p-2 ">
          <Ionicons name="menu-outline" size={23} color={"gray"} />
        </TouchableOpacity>
      </View>
      {allFavorite.length == 0 ? (
        <View className="flex-1 items-center justify-center pt-2 space-y-3">
          <View className="items-center justify-center px-3 ">
            <LottieView
              autoPlay
              style={{
                width: 200,
                height: 150,
              }}
              source={require("../../assets/emptyOrder.json")}
            />
          </View>
          <Text className="font-bold text-gray-600 text-[17px]">
            Your have no saved Collections
          </Text>
        </View>
      ) : (
        <View>
          <Text>Your have saved Collections</Text>
        </View>
      )}
    </View>
  );
};

export default Favorite;
