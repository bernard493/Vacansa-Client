import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import SearchLocationBtn from "../Components/SearchLocationBtn/SearchLocationBtn";
import TopSearchesCard from "../Components/TopSearchesCard/TopSearchesCard";
import popularHotelData from "../Components/PopularHotels/popularHotelData";
import { useNavigation } from "@react-navigation/native";

const list = ["Accra", "Legon", "Oda", "Tema", "labadi"];

const SearchScreen = () => {
  const navigate = useNavigation();
  const [searchValue, setSearchValue] = useState("");

  return (
    <SafeAreaView className="bg-white flex-1 pt-10 ">
      <View className="p-3 px-5 space-y-5">
        <View className="flex-row items-center justify-between space-x-3 ">
          <View className="flex-row flex-1 items-center justify-start space-x-1 py-3 px-2 rounded-xl border-2 border-gray-300">
            <Ionicons name="search" size={25} color={"#696969"} />
            <TextInput
              value={searchValue}
              onChangeText={setSearchValue}
              keyboardType="default"
              placeholder="Type name, location or city"
              className="w-full"
            />
          </View>
          <TouchableOpacity onPress={() => navigate.goBack()}>
            <Text className="text-orange-400 font-bold text-md">Cancel</Text>
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center space-x-3">
          <TouchableOpacity className="flex-row items-center space-x-1 border-2 border-gray-200 py-1 px-2 rounded-xl">
            <Ionicons name="location" size={15} color={"gray"} />
            <Text className="text-gray-500">Near me</Text>
          </TouchableOpacity>
          <FlatList
            data={list}
            renderItem={({ item }) => <SearchLocationBtn item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            keyExtractor={(item) => item}
          />
        </View>
        <View>
          <Text className="text-gray-700 font-bold text-md">Top Searches</Text>
          <FlatList
            data={popularHotelData}
            renderItem={({ item }) => <TopSearchesCard item={item} />}
            showsHorizontalScrollIndicator={false}
            bounces={false}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;
