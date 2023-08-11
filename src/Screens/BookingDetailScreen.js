import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import popularHotelData from "../Components/PopularHotels/popularHotelData";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Center, Skeleton, VStack, HStack } from "native-base";
import BookingDetailModel from "../Components/Models/BookingModels/BookingDetailModel";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDateConvert } from "../CustomHooks/useDateConvert";
import { useSelector, useDispatch } from "react-redux";
import { addCart } from "../redux/features/cartSlice";
import { getRoomById } from "../api/Hotel_Api";

const BookingDetailScreen = ({ route }) => {
  const navigate = useNavigation();
  const { user } = useSelector((state) => state.user);
  const { hotelId, hotelRoomId, checkingInDate, checkingOutDate } =
    route.params;
  const [hotelRoom, setHotelRoom] = useState({});
  const [roomImage, setRoomImage] = useState("");
  const [discountPrice, setDiscountPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingDetailModelVisible, setBookingDetailModelVisible] =
    useState(false);
  const [bookingName, setBookingName] = React.useState("");
  const [bookingEmail, setBookingEmail] = React.useState("");
  const [bookingNumber, setBookingNumber] = React.useState("024155420");
  const [paymentMethod, setPaymentMethod] = React.useState("");
  const dispatch = useDispatch();

  // get User detail from firebase for booking details
  useEffect(() => {
    if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      const name = user.name;
      const email = user.email;
      setBookingEmail(email);
      setBookingName(name);
    }
  }, [hotelId]);

  // API call to get hotel room from hotel selected
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
            // destructure image array
            // was giving error
            setRoomImage(data?.image[0]);
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
      const totalAmount = hotelRoom.price - getDiscountPrice;
      setTotalAmount((prev) => totalAmount);
    } else setTotalAmount((prev) => hotelRoom.price);
  }, [hotelRoom]);

  // console.log("hotelRoomImage", hotelRoom.image);
  // console.log("discountPrice", discountPrice);
  // console.log("isLoading", isLoading);
  const handleMakePayment = () => {
    if (bookingName !== "" && bookingEmail !== "" && bookingNumber !== "") {
      dispatch(
        addCart({
          room: { ...hotelRoom, roomImage },
          orderInfor: {
            room_id: hotelRoomId,
            hotel_id: hotelId,
            checkingInDate,
            checkingOutDate,
            bookingName,
            bookingEmail,
            bookingNumber,
          },
        })
      );
      navigate.navigate("Payment", {
        totalAmount,
      });
    } else {
      Alert.alert("Alert Title", "Please fill in Booking Details", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  return (
    <>
      {!isLoading ? (
        <SafeAreaView className="bg-white flex-1 pt-10">
          <View className="h-screen">
            <View className="flex-row items-center justify-between px-3 pb-2">
              <TouchableOpacity onPress={() => navigate.goBack()}>
                <Ionicons
                  name="chevron-back-outline"
                  size={30}
                  color={"gray"}
                />
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
            <View>
              {/* ROOM */}
              <View className="flex-row items-center justify-start px-5 pt-10 space-x-3">
                <View>
                  {roomImage && (
                    <Image
                      source={{
                        uri: roomImage,
                      }}
                      className=" rounded-lg"
                      style={styles.image}
                    />
                  )}
                </View>
                <View className="space-y-2">
                  <Text className="text-gray-800 font-bold text-[13px] w-[230px]">
                    {hotelRoom.roomTitle}
                  </Text>
                  <Text className="text-gray-400 font-semibold text-[11px]">
                    Grand Deluks Double
                  </Text>
                  <View className="flex-row items-center space-x-2">
                    <Ionicons
                      name="people-outline"
                      size={18}
                      color={"#12C6FF"}
                    />
                    <Text className="text-gray-500 font-semibold text-[12px]">
                      {hotelRoom.bed}, {hotelRoom.guests} Adults
                    </Text>
                  </View>
                </View>
              </View>
              <View className="px-5 pt-10">
                {/* Booking infor */}
                <View className="flex-row items-center justify-between">
                  <View className="space-y-2">
                    <Text className="text-gray-400 font-semibold text-[12px]">
                      Check-in
                    </Text>
                    <Text className="text-gray-700 font-bold text-[13px]">
                      {useDateConvert(checkingInDate)}
                    </Text>
                  </View>
                  <View className="border-t-2  border-gray-300 w-20" />
                  <View className="space-y-2">
                    <Text className="text-gray-400 font-semibold text-[12px]">
                      Check-out
                    </Text>
                    <Text className="text-gray-700 font-bold text-[13px]">
                      {useDateConvert(checkingOutDate)}
                    </Text>
                  </View>
                </View>
                <View className="bg-gray-50 px-4 py-5 rounded-lg mt-10 space-y-5">
                  <View className="flex-row items-center justify-between">
                    <Text className="text-gray-700 font-bold text-[13px]">
                      Booking Details
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        setBookingDetailModelVisible(!bookingDetailModelVisible)
                      }
                    >
                      <Text className="text-[#12C6FF] font-bold text-[13px]">
                        Edit
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View className="space-y-3">
                    <Text className="text-gray-700 font-bold text-[12px]">
                      Mr {bookingName}
                    </Text>
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center justify-start space-x-2">
                        <Ionicons
                          name="mail-outline"
                          size={18}
                          color={"black"}
                        />
                        <Text className="text-gray-500 font-semibold text-[12px]">
                          Email
                        </Text>
                      </View>
                      <Text className="text-gray-500  text-[14px]">
                        {bookingEmail}
                      </Text>
                    </View>
                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center justify-start space-x-2">
                        <Ionicons
                          name="call-outline"
                          size={18}
                          color={"black"}
                        />
                        <Text className="text-gray-500 font-semibold text-[12px]">
                          Phone
                        </Text>
                      </View>
                      <Text className="text-gray-500  text-[14px]">
                        {bookingNumber}
                      </Text>
                    </View>
                  </View>
                </View>
                <BookingDetailModel
                  bookingName={bookingName}
                  setBookingName={setBookingName}
                  bookingEmail={bookingEmail}
                  setBookingEmail={setBookingEmail}
                  bookingNumber={bookingNumber}
                  setBookingNumber={setBookingNumber}
                  openModel={bookingDetailModelVisible}
                  setOpenModel={setBookingDetailModelVisible}
                />
              </View>
            </View>
          </View>
          <View className="p-5 pb-7  flex-row items-center justify-between  absolute bottom-0 bg-[#F8F8FF] w-full">
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
                  <Text className="text-gray-400 text-[8px] font-semibold">
                    per room per night
                  </Text>
                </View>
              ) : (
                <View className="flex-row items-center space-x-2">
                  <Text className="text-[13px] font-bold text-[#12C6FF]  ">
                    GH¢ {hotelRoom.price}
                  </Text>
                  <Text className="text-gray-400 text-[8px] font-semibold">
                    per room per night
                  </Text>
                </View>
              )}
            </View>
            <TouchableOpacity
              onPress={handleMakePayment}
              className="bg-[#12C6FF] flex items-center py-4 rounded-lg  px-6"
            >
              <Text className="text-white font-bold ">Continue</Text>
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
          <View className="space-y-10">
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
          </View>
        </SafeAreaView>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  image: {
    height: 90,
    width: 120,
  },
});
export default BookingDetailScreen;
