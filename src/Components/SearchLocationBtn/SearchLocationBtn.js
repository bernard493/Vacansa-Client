import { TouchableOpacity, Text } from "react-native";
import React from "react";


const SearchLocationBtn = ({ item }) => {
  return (
    <TouchableOpacity className="flex-row items-center  border-2 border-gray-200 py-1 px-2 rounded-xl mx-3">
      <Text className="text-gray-500">{item}</Text>
    </TouchableOpacity>
  );
};

export default SearchLocationBtn;
