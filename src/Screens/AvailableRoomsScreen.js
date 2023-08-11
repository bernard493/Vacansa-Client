import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  FlatList,
  SafeAreaView,
  Modal,
  StyleSheet,
  Alert,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import popularHotelData from "../Components/PopularHotels/popularHotelData";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ScrollView } from "native-base";
import AvailableRoomCard from "../Components/AvailableRooms/AvailableRoomCard";
import moment from "moment";
import BookingDateModel from "../Components/Models/BookingModels/BookingDateModel";
import { Center, Skeleton, VStack, HStack } from "native-base";
import { useDateConvert } from "../CustomHooks/useDateConvert";
import { getHotelRoomsById } from "../api/Hotel_Api";

//   Trying to pass down props to open model

const AvailableRoomsScreen = ({ route }) => {
  const navigate = useNavigation();
  const { hotelId } = route.params;
  const [hotelRooms, setHotelRooms] = useState([]); // hotel rooms of hotel selected
  const [hotelRoomId, setHotelRoomId] = useState(""); // hotel rooms of hotel selected
  const [modalVisible, setModalVisible] = useState(false); // open close model
  const [openBookingCheckingInDateModel, setOpenBookingCheckingInDateModel] =
    useState(false); // opens BookingDateModel for date picker
  const [openBookingCheckingOutDateModel, setOpenBookingCheckingOutDateModel] =
    useState(false); // opens BookingDateModel for date picker
  const [checkingInDate, setCheckingInDate] = useState(""); //hold date sate in 2023/3/34 format
  const [checkingOutDate, setCheckingOutDate] = useState(""); //hold date sate in 2023/3/34 format
  const animatedButtonScale = new Animated.Value(1);
  const animatedScaleStyle = {
    transform: [{ scale: animatedButtonScale }],
  };
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  // API call to get hotel room from hotel selected
  useEffect(() => {
    setIsLoading(true)
    const getRoomsById = async () => {
      getHotelRoomsById(hotelId).then(async (response) => {
        try {
          const data = response.data.rooms;

          if (response.status !== 200) {
            console.log(`Cant find hotel with id ${hotelId}`);
          } else {
            setHotelRooms(data);
            setIsLoading(false)
          }
        } catch (error) {
          console.error(error);
        }
      });
    };
    getRoomsById();
  }, [hotelId]);
  //save user input and pass to next screen
  const handleSaveChanges = () => {
    if (checkingInDate !== "" && checkingOutDate !== "") {
      setModalVisible(false);

      navigate.navigate("SelectedRoom", {
        hotelId,
        hotelRoomId,
        checkingInDate,
        checkingOutDate,
      });
    } else {
      Alert.alert("Alert Title", "Please fill in Check in and check out date", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  // opens model with seleced room id
  const toggle = (selectedRoomId) => {
    // setBookingDate(!bookingDate)
    setModalVisible(true);
    setHotelRoomId(selectedRoomId);
  };

  // open model to update checking In and out date
  const updateCheckInandOutdate = () => {
    setModalVisible(true);
  };

  // clear saved saved check in and check out date and close model
  const clearSavedDate = () => {
    setCheckingInDate("");
    setCheckingOutDate("");
    setModalVisible(!modalVisible);
  };
  return (
    <>
      {!isLoading ? (
        <SafeAreaView className="bg-white flex-1 pt-10 ">
          <View className="flex-row items-center justify-between px-3 pb-2">
            <TouchableOpacity onPress={() => navigate.goBack()}>
              <Ionicons name="chevron-back-outline" size={30} color={"gray"} />
            </TouchableOpacity>
            <View className="">
              <Text className="text-gray-700 font-bold text-[16px]">
                 Room Available 
              </Text>
            </View>
            <View className="">
              <TouchableOpacity>
                <Ionicons name="share-outline" size={30} color={"gray"} />
              </TouchableOpacity>
            </View>
          </View>
          {checkingInDate && (
            <Animated.View
              style={animatedScaleStyle}
              className="bg-[#12C6FF] p-4 space-y-1"
            >
              <Text className="text-white font-bold">Plan to stay</Text>
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center justify-center space-x-1">
                  <Ionicons name="calendar-outline" size={20} color={"white"} />
                  <Text className="text-white font-bold text-[10px] ">
                    {checkingInDate ? useDateConvert(checkingInDate) : ""} -{" "}
                    {checkingOutDate ? useDateConvert(checkingOutDate) : ""}, 1
                    night
                  </Text>
                </View>
                <TouchableOpacity onPress={updateCheckInandOutdate}>
                  <Text className="text-white font-bold text-[15px] ">
                    Change
                  </Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          )}

          <FlatList
            data={hotelRooms}
            refreshing={refreshing}
            onRefresh={onRefresh}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            renderItem={({ item }) => (
              <AvailableRoomCard item={item} toggle={toggle} />
            )}
            horizontal={false}
            showsVerticalScrollIndicator={false}
            // pagingEnabled
            bounces={false}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{
              paddingBottom: 10,
            }}
          />

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <SafeAreaView className=" absolute -bottom-10">
              <View
                style={styles.modalView}
                className="p-5 space-y-2 pb-10 w-screen "
              >
                <View className="space-y-6">
                  <View className="flex-row items-center justify-center ">
                    <Text className="flex-1 text-center font-bold">
                      Set Plan to Stay{" "}
                    </Text>
                    <TouchableOpacity onPress={clearSavedDate}>
                      <Text className="text-gray-500 font-semibold">
                        Cancel
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View className="border-b-2 border-gray-300 " />
                </View>
                <View className="space-y-5">
                  <View className="space-y-4">
                    <Text className="font-medium  text-left  capitalize">
                      Check in
                    </Text>
                    <View className="flex-row items-center justify-left space-x-2 pr-5">
                      <Ionicons name="calendar" color={"#12C6FF"} size={20} />
                      {openBookingCheckingInDateModel ? (
                        <BookingDateModel
                          bookingDate={checkingInDate}
                          setBookingDate={setCheckingInDate}
                          openBookingDateModel={openBookingCheckingInDateModel}
                          setOpenBookingDateModel={
                            setOpenBookingCheckingInDateModel
                          }
                        />
                      ) : (
                        <TouchableOpacity
                          onPress={() =>
                            setOpenBookingCheckingInDateModel(true)
                          }
                          className="w-full"
                        >
                          {checkingInDate ? (
                            <Text className="text-[12px] font-semibold text-gray-700">
                              {useDateConvert(checkingInDate)}
                            </Text>
                          ) : (
                            <Text className="text-[12px] font-semibold text-gray-500">
                              Enter check in date
                            </Text>
                          )}
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                  <View className="border-b-2 border-gray-300 " />
                </View>
                <View className="space-y-5">
                  <View className="space-y-4">
                    <Text className="font-medium  text-left  capitalize">
                      Check Out
                    </Text>
                    <View className="flex-row items-center justify-left space-x-2 pr-5">
                      <Ionicons name="calendar" color={"#12C6FF"} size={20} />
                      {openBookingCheckingOutDateModel ? (
                        <BookingDateModel
                          bookingDate={checkingOutDate}
                          setBookingDate={setCheckingOutDate}
                          openBookingDateModel={openBookingCheckingOutDateModel}
                          setOpenBookingDateModel={
                            setOpenBookingCheckingOutDateModel
                          }
                        />
                      ) : (
                        <TouchableOpacity
                          onPress={() =>
                            setOpenBookingCheckingOutDateModel(true)
                          }
                          className="w-full"
                        >
                          {checkingOutDate ? (
                            <Text className="text-[12px] font-semibold text-gray-700">
                              {useDateConvert(checkingOutDate)}
                            </Text>
                          ) : (
                            <Text className="text-[12px] font-semibold text-gray-500">
                              Enter check Out date
                            </Text>
                          )}
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                  <View className="border-b-2 border-gray-300 " />
                </View>
                <View className="p-5   flex items-center  w-full">
                  <TouchableOpacity
                    onPress={handleSaveChanges}
                    className="bg-[#12C6FF] flex items-center py-4 rounded-lg w-full"
                  >
                    <Text className="text-white font-bold ">Continue</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </SafeAreaView>
          </Modal>
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
              <Skeleton
                flex="1"
                h="150"
                rounded="md"
                startColor="coolGray.100"
              />
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
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  modalView: {
    marginTop: 390,
    // bottom: 0,
    backgroundColor: "white",
    // borderTopRadius: 20,
    // padding: 35,
    // alignItems: "center",
    alignSelf: "stretch",
    shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    shadowOpacity: 0.65,
    shadowRadius: 40,
    elevation: 7,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default AvailableRoomsScreen;
