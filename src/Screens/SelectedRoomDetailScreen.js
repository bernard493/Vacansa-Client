import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import popularHotelData from "../Components/PopularHotels/popularHotelData";
import SelectedRoomImageCard from "../Components/SelectedRoom/SelectedRoomImageCard";
import { Center, Skeleton, VStack } from "native-base";
import { getRoomById } from "../api/Hotel_Api";
import COLORS from "../constants/style"

const SelectedRoomDetailScreen = ({ route }) => {
  const navigate = useNavigation();
  const { hotelId, hotelRoomId, checkingInDate, checkingOutDate } = route.params;
  const [hotelRoom, setHotelRoom] = useState({});
  const [discountPrice, setDiscountPrice] = useState(0);
  const [bookingPrice, setBookingPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // API call to get  room selected from rooms
  useEffect(() => {
    setIsLoading(true);
    const getRoomByRoomId = async () => {
      getRoomById(hotelRoomId).then(async (response) => {
        try {
          const data = response.data.room;

          if (response.status !== 200) {
            console.log(`Cant find room with id ${hotelRoomId}`);
          } else {
            setHotelRoom(data);
            setIsLoading(false);
          }
        } catch (error) {
          console.error(error);
        }
      });
    };
    getRoomByRoomId();
  }, [hotelRoomId]);

  // calculate discount and final price

  useEffect(() => {
    if (hotelRoom.discountPer) {
      const getDiscountPrice = hotelRoom.price * (hotelRoom.discountPer / 100);
      setDiscountPrice((prev) => getDiscountPrice);
      const bookingPrice = hotelRoom.price - getDiscountPrice;
      setBookingPrice((prev) => bookingPrice);
    } else setBookingPrice((prev) => hotelRoom.price);
  }, [hotelRoom]);

  const handleBooking = () => {
    navigate.navigate("ConfirmBookingDetails", {
      hotelId,
      hotelRoomId,
      checkingInDate,
      checkingOutDate,
    });
  };

  return (
    <>
      {!isLoading ? (
        <SafeAreaView className="bg-white flex-1 pt-10">
          <View className="flex-row items-center justify-between px-3 pb-2">
            <TouchableOpacity onPress={() => navigate.goBack()}>
              <Ionicons name="chevron-back-outline" size={30} color={"gray"} />
            </TouchableOpacity>
            <View className="">
              <Text className="text-gray-700 font-bold text-[16px]">
                Details
              </Text>
            </View>
            <View className="">
              <TouchableOpacity>
                <Ionicons name="share-outline" size={30} color={"gray"} />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView className="p-3 space-y-4">
            <FlatList
              data={hotelRoom.image}
              renderItem={({ item }) => <SelectedRoomImageCard image={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              // pagingEnabled
              // bounces={false}
              keyExtractor={(item, index) => item + index}
            />

            <View className="space-y-2">
              <Text className="text-[20px] font-bold text-gray-800 w-[350px]">
                {hotelRoom.roomTitle}
              </Text>
              <Text className="text-bold text-[14px] text-orange-600">
                {hotelRoom.roomsAvailable} rooms left
              </Text>
            </View>

            {/* room facilities */}
            <View className="flex-row items-center justify-center space-x-6">
              <View className="mx-4 flex items-center space-y-2">
                <View className=" p-3 border-2 border-gray-300 rounded-lg flex items-center">
                  <Ionicons name="bed-outline" size={22} color={"black"} />
                </View>
                <Text className="text-gray-600 font-bold text-[12px]">
                  {hotelRoom.bed}
                </Text>
              </View>
              <View className="mx-4 flex items-center space-y-2">
                <View className=" p-3 border-2 border-gray-300 rounded-lg flex items-center">
                  <Ionicons name="people-outline" size={22} color={"black"} />
                </View>
                <Text className="text-gray-600 font-bold text-[12px]">
                  {hotelRoom.guests} Guests
                </Text>
              </View>
              <View className="mx-4 flex items-center space-y-2">
                <View className=" p-3 border-2 border-gray-300 rounded-lg flex items-center">
                  <Ionicons name="wifi-outline" size={22} color={"black"} />
                </View>

                <Text className="text-gray-500 font-bold">
                  {hotelRoom.wifi ? "Wifi" : " No Wifi"}
                </Text>
              </View>
              <View className="mx-4 flex items-center space-y-2">
                <View className=" p-3 border-2 border-gray-300 rounded-lg flex items-center">
                  <Ionicons
                    name="tablet-landscape-outline"
                    size={22}
                    color={"black"}
                  />
                </View>
                <Text className="text-gray-600 font-bold text-[12px]">
                  {hotelRoom.squareMeter}
                </Text>
              </View>
            </View>
            {/* room description */}
            <View className="space-y-3 my-5">
              <Text className="text-gray-700 font-bold  text-md">
                Room Description
              </Text>
              <Text className="text-gray-500   text-sm">
                {hotelRoom.roomDescription}
              </Text>
            </View>
          </ScrollView>

          <View className="px-5 py-6  flex-row items-center justify-between  absolute bottom-0 bg-[#F8F8FF] w-full">
            <View className="space-y-2">
              {hotelRoom.discountPer ? (
                <View className="flex-row items-center space-x-1">
                  <View>
                    <Text className="text-[13px] font-bold text-gray-400  line-through">
                      GH¢ {discountPrice}
                    </Text>
                    <View className="py-1 px-2 bg-orange-400 rounded-lg">
                      <Text className="text-[9px] font-bold text-white ">
                        {hotelRoom.discountPer}%
                      </Text>
                    </View>
                  </View>
                  <Text className="text-gray-400 text-[10px] font-semibold">
                    per room per night
                  </Text>
                </View>
              ) : (
                <View className="flex-row items-center space-x-2">
                  <Text className={`text-[13px] font-bold text-[${COLORS.primary}]`}>
                    GH¢ {hotelRoom.price}
                  </Text>
                  <Text className="text-gray-400 text-[10px] font-semibold">
                    per room per night
                  </Text>
                </View>
              )}
            </View>
            <TouchableOpacity
              onPress={handleBooking}
              className={`bg-[${COLORS.primary}] flex items-center py-4 rounded-lg  px-6`}
            >
              <Text className="text-white font-bold ">Book Now</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      ) : (
        <SafeAreaView className="space-y-6 flex-1 pt-10">
          <View className="flex-row items-center justify-between px-3 pb-2">
            <TouchableOpacity onPress={() => navigate.goBack()}>
              <Ionicons name="chevron-back-outline" size={30} color={"gray"} />
            </TouchableOpacity>
            <View className="">
              <Text className="text-gray-700 font-bold text-[16px]">
                Booking Details
              </Text>
            </View>
            <View className="">
              <TouchableOpacity>
                <Ionicons name="share-outline" size={30} color={"gray"} />
              </TouchableOpacity>
            </View>
          </View>

          <Center w="100%">
            <VStack
              w="90%"
              maxW="400"
              borderWidth="1"
              space={8}
              overflow="hidden"
              rounded="md"
              _dark={{
                borderColor: "coolGray.500",
              }}
              _light={{
                borderColor: "coolGray.200",
              }}
            >
              <Skeleton h="40" />
              <Skeleton.Text px="4" />
              <Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
            </VStack>
          </Center>
        </SafeAreaView>
      )}
    </>
  );
};

export default SelectedRoomDetailScreen;
