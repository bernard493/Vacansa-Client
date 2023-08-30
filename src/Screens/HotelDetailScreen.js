import {
  View,
  Text,
  SafeAreaView,
  Animated,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import HotelDetailImageCard from "../Components/HotelDetail/HotelDetailImageCard";
import HotelDetailPaginator from "../Components/HotelDetail/HotelDetailPaginator";
import popularHotelData from "../Components/PopularHotels/popularHotelData";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HotelDetailFacilityCard from "../Components/HotelDetail/HotelDetailFacilityCard";
import HotelDetailReviewStar from "../Components/HotelDetail/HotelDetailReviewStar";
import HotelDetailReviewUserImage from "../Components/HotelDetail/HotelDetailReviewUserImage";
import { Center, Skeleton, VStack, HStack } from "native-base";
import { getAllHotelReviews } from "../api/Review_Api";
import useHotelData from "../CustomHooks/useHotelData"
import COLORS from "../constants/style"


const HotelDetailScreen = ({ route }) => {
  const navigate = useNavigation();
  const { hotelId } = route.params;
  const [currentIndex, setCurrentIndex] = useState(0);
  const { hotel, loading } = useHotelData(hotelId);
  const [hotelReviews, setHotelReviews] = useState([]);
  const [hotelImage, setHotelImage] = useState([]);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  // get all review of hotel by hotel id 
  useEffect(() => {
    const getReviews = async () => {
      getAllHotelReviews(hotelId).then(async (response) => {
        try {
          const data = response.data.review;

          if (response.status !== 200) {
            console.log(`Cant find hotel with id ${hotelId}`);
          } else {
            setHotelReviews(data);
          }
        } catch (error) {
          console.error(error);
        }
      });
    };
    getReviews();
  }, [hotelId]);

  const handleAvailableRoomCheck = () => {
    navigate.navigate("AvailableRooms", {
      hotelId: hotelId,
    });
  };

  return (
    <>
      {!loading ? (
        <View className="bg-white flex-1">
          <View className="relative">
            <FlatList
              data={hotel.image}
              renderItem={({ item }) => <HotelDetailImageCard item={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              bounces={false}
              keyExtractor={(item, index) => item + index}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                {
                  useNativeDriver: false,
                }
              )}
              onViewableItemsChanged={viewableItemsChanged}
              viewabilityConfig={viewConfig}
              scrollEventThrottle={32}
              ref={slidesRef}
            />
            <View className="absolute ">
              <View className=" top-12 flex items-center justify-center   w-full">
                <View className="flex-row  items-center justify-between w-screen px-4 ">
                  <TouchableOpacity
                    onPress={() => navigate.goBack()}
                    className="p-1 bg-white/40 backdrop-blur-sm rounded-lg"
                  >
                    <Ionicons
                      name="chevron-back-outline"
                      size={30}
                      color={"#DCDCDC"}
                    />
                  </TouchableOpacity>
                  <View>
                    <Text className="text-gray-200 font-bold text-[16px]">
                      Hotel Details
                    </Text>
                  </View>
                  <View>
                    {hotel.favorite ? (
                      <TouchableOpacity className="p-1 bg-white/40 backdrop-blur-sm rounded-lg">
                        <Ionicons name="bookmark" size={30} color={"#00D4AE"} />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity className="p-1 bg-white/40 backdrop-blur-sm rounded-lg">
                        <Ionicons
                          name="bookmark-outline"
                          size={30}
                          color={"#C0C0C0"}
                        />
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
              <View className="absolute  left-0 top-[250px]   px-7 ">
                <View className="flex items-start justify-start">
                  <Text className="text-gray-100 text-[15px] font-bold">
                    {hotel.name}
                  </Text>
                  <View className="flex-row items-center justify-center space-x-1 space-y-1">
                    <View>
                      <Ionicons name="location" size={17} color={COLORS.primary} />
                    </View>
                    <View>
                      <Text className="text-gray-100 font-semibold text-[12px]">
                        {hotel.address}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View className="absolute top-[300px] w-screen flex items-center justify-center">
                <HotelDetailPaginator data={hotel.image} scrollX={scrollX} />
              </View>
            </View>
          </View>

          <ScrollView className="mt-4">
            <View className="space-y-5   w-full px-5 ">
              <View className="space-y-4">
                <View className="flex-row items-center justify-between">
                  <Text className="text-gray-700 font-bold  text-md">
                    Facilities
                  </Text>
                  <TouchableOpacity>
                    <Text className="text-gray-400 font-semibold text-sm">
                      {/* Navigate to all Review */}
                      See All
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="flex-row items-center justify-between">
                  <FlatList
                    data={hotel.facilities}
                    renderItem={({ item }) => (
                      <HotelDetailFacilityCard item={item} />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    keyExtractor={(item, index) => item + index}
                  />
                </View>
              </View>

              <View className="space-y-1   w-full  ">
                <View className="flex-row items-center justify-between">
                  <Text className="text-gray-700 font-bold  text-md">
                    Reviews
                  </Text>
                  <TouchableOpacity>
                    <Text className="text-gray-400 font-semibold text-sm">
                      See All
                    </Text>
                  </TouchableOpacity>
                </View>
                {hotelReviews.length !== 0 ? (
                  <View className="flex-row items-center justify-between border-2 border-gray-300 p-3 rounded-lg">
                    <View className="flex-row items-center space-x-1">
                      <Text className="text-gray-700 font-semibold">
                        {hotelReviews[0]?.rating}
                      </Text>
                      <View>
                        <HotelDetailReviewStar
                          rating={hotelReviews[0]?.rating}
                        />
                      </View>
                    </View>
                    <View className="flex-row items-center">
                      <HotelDetailReviewUserImage review={hotelReviews} />
                    </View>
                  </View>
                ) : (
                  <View className="flex-row items-center justify-between border-2 border-gray-300 p-3 rounded-lg">
                    <View className="flex-row items-center space-x-1">
                      <Text className="text-gray-700 font-semibold">
                        no rating yet
                      </Text>
                      <View>
                        {/* <HotelDetailReviewStar rating={hotelReviews[0]?.rating} /> */}
                      </View>
                    </View>
                    <View className="flex-row items-center">
                      {/* <HotelDetailReviewUserImage review={hotelReviews} /> */}
                    </View>
                  </View>
                )}
              </View>

              <View className="space-y-4   w-full  ">
                <View className="flex-row items-center justify-between">
                  <Text className="text-gray-700 font-bold  text-md">
                    Overview
                  </Text>
                </View>
                <Text className="text-gray-600 text-[15px] tracking-wide leading-20">
                  {hotel.overview}
                </Text>
              </View>
            </View>
          </ScrollView>
          <View className=" px-5  py-7 bottom-0  flex items-center bg-[#F8F8FF] w-full">
            <TouchableOpacity
              onPress={handleAvailableRoomCheck}
              className={`bg-[${COLORS.primary}] flex items-center py-4 rounded-lg w-full`}
            >
              <Text className="text-white font-bold ">
                Check Available Room
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <SafeAreaView className="bg-white flex-1 pt-10">
          <View className="flex-row  items-center justify-between w-screen px-4 ">
            <TouchableOpacity
              onPress={() => navigate.goBack()}
              className="p-1 backdrop-blur-sm rounded-lg"
            >
              <Ionicons name="chevron-back-outline" size={30} color={"gray"} />
            </TouchableOpacity>
            <View>
              <Text className="text-gray-700 font-bold text-[16px]">
                Hotel Details
              </Text>
            </View>
            <View>
              <TouchableOpacity
                className="p-1 bg-white/40 backdrop-blur-sm rounded-lg"
                disabled
              >
                <Ionicons name="bookmark-outline" size={30} color={"#C0C0C0"} />
              </TouchableOpacity>
            </View>
          </View>
          <View className="pt-5 space-y-6">
            <View>
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
                  <Skeleton
                    px="4"
                    my="4"
                    rounded="md"
                    startColor="primary.100"
                  />
                </VStack>
              </Center>
            </View>
            <View>
              <Center w="100%">
                <HStack
                  w="90%"
                  maxW="400"
                  borderWidth="1"
                  space={8}
                  rounded="md"
                  _dark={{
                    borderColor: "coolGray.500",
                  }}
                  _light={{
                    borderColor: "coolGray.200",
                  }}
                  p="4"
                >
                  <VStack flex="3" space="4">
                    <Skeleton startColor="amber.300" />
                    <Skeleton.Text />
                    <HStack space="2" alignItems="center">
                      <Skeleton size="5" rounded="full" />
                      <Skeleton h="3" flex="2" rounded="full" />
                      <Skeleton
                        h="3"
                        flex="1"
                        rounded="full"
                        startColor="indigo.300"
                      />
                    </HStack>
                  </VStack>
                </HStack>
              </Center>
            </View>

            <View className=" ">
              <Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
            </View>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default HotelDetailScreen;
