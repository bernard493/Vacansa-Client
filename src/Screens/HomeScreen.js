import {
  View,
  Text,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import CarouselCards from "../Components/CarouselCard/CarouselCards ";
import { useNavigation } from "@react-navigation/native";
import PopularHotels from "../Components/PopularHotels/PopularHotels";
import Recommended from "../Components/Recommended/Recommended";
import { Avatar } from "native-base";
import { useSelector } from "react-redux";
import * as Location from "expo-location";
import { getAllPopularHotels } from "../api/Hotel_Api";
import COLORS from "../constants/style"
// import { useSelector, useDispatch } from "react-redux";
// import { setUserProfile } from "../redux/features/User/userSlice";

const HomeScreen = () => {
  const navigate = useNavigation();
  const { user } = useSelector((state) => state.user);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popularHotels, setPopularHotels] = useState([]);

  useEffect(() => {
    setLoading(true);
    const getPopularHotels = async () => {
      try {
        const response = await getAllPopularHotels();

        const data = response?.data?.popularHotels || [];

        if (response.status !== 200) {
          Alert.alert('Error', 'Something went wrong. Please try again later.');
        } else {
          setPopularHotels(data);
        }
      } catch (error) {
        Alert.alert('Error', 'Something went wrong. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    getPopularHotels();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const getPopularHotels = async () => {
      try {
        const response = await getAllPopularHotels();

        const data = response?.data?.popularHotels || [];

        if (response.status !== 200) {
          Alert.alert('Error', 'Something went wrong. Please try again later.');
        } else {
          setPopularHotels(data);
        }
      } catch (error) {
        Alert.alert('Error', 'Something went wrong. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    getPopularHotels();
    setRefreshing(false);
  }, []);


  return (
    <SafeAreaView className="bg-white flex-1 pt-10">
      <View className="p-3 space-x-3 space-y-3">
        <View className="pt-3">
          <Text className="text-[16px] pl-2 font-semibold text-gray-800">
            Welcome {user?.name.split(" ")[0]}
          </Text>
        </View>
        <View className="flex-row items-center justify-between ">
          <View className="flex-row items-center justify-center border-2 border-gray-300 p-1 px-2  space-x-3 rounded-lg">
            <Ionicons name="location" size={15} color={COLORS.primary} />
            <Text className="text-[11px] font-semibold text-gray-600">
              {/* {city} */}
            </Text>
          </View>
          <View className="flex-row items-center justify-center space-x-4">
            <TouchableOpacity
              onPress={() => navigate.navigate("Search")}
              className="border-2 border-gray-200 p-1  space-x-3 rounded-lg"
            >
              <Ionicons name="search" size={23} color={"gray"} />
            </TouchableOpacity>

            <Avatar
              bg="green.500"
              source={{
                uri: user?.avatar,
              }}
              size={"sm"}
            >
              {user?.name?.charAt(0)}
            </Avatar>
          </View>
        </View>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        className="px-3 "
        showsVerticalScrollIndicator={false}
      >
        {/*  CarouselCards*/}

        <CarouselCards />
        <View className="py-3">
          {/*  PopularHotels */}
          <PopularHotels loading={loading} popularHotels={popularHotels} />
        </View>
        <View>
          {/* {Recommended} */}
          <Recommended loading={loading} popularHotels={popularHotels} />
        </View>

        {/* <Text>HomePage</Text>
        <TouchableOpacity
          onPress={handleSignOut}
          className="bg-[#12C6FF] h-12 flex items-center justify-center rounded-lg"
        >
          <Text className="text-white text-md font-semibold">Log Out</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

