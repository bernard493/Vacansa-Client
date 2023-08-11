import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import popularHotelData from "../Components/PopularHotels/popularHotelData";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Center,
  Skeleton,
  VStack,
  HStack,
  Checkbox,
  ScrollView,
} from "native-base";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { PaymentIcon } from "react-native-payment-icons";
import { useSelector } from "react-redux";
import { createOrder } from "../api/Order_Api";

const cards = [
  {
    id: 132,
    type: "visa",
    number: "**** **** **** 6215",
  },

  {
    id: 124,
    type: "discover",
    number: "**** **** **** 8754",
  },
];

const PaymentScreen = ({ route }) => {
  const navigation = useNavigation();
  const [paymentMethod, setPaymentMethod] = useState("");
  const orderInfor = useSelector((state) => state.cart.orderInfor);
  const room = useSelector((state) => state.cart.room);
  const { totalAmount } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  console.log("orderInfor", orderInfor);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const handleMakePayment = () => {
    // handleMakePayment with strip api
    if (!paymentMethod) {
      Alert.alert(
        " Payment Method",
        "Please Select Payment Method",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }

    if (paymentMethod === "Cash") {
      setIsLoading(true);
      createOrder({
        ...orderInfor,
        totalAmountPaid: totalAmount,
        paymentMethod,
      }).then(async (response) => {
        // setLoggingIn(true);
        try {
          const status = response.status;
          if (status !== 200) {
            setIsError(true);
            // console.log("status",response);
            setIsLoading(false);
          } else {
            navigation.replace("OrderConfirmation", {
              totalAmount,
              paymentMethod,
            });
            setIsLoading(false);
          }
        } catch (error) {
          console.error(error);
          setIsLoading(false);
        }
      });
    }
  };
  return (
    <>
      {!isLoading ? (
        <SafeAreaView className="bg-white flex-1 pt-10">
          <View className="h-screen space-y-5">
            <View className="flex-row items-center justify-between px-3 pb-2">
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                  name="chevron-back-outline"
                  size={30}
                  color={"gray"}
                />
              </TouchableOpacity>
              <View className="">
                <Text className="text-gray-700 font-bold text-[16px]">
                  Confirm your Payment
                </Text>
              </View>
              <View className="">
                <TouchableOpacity>
                  <Ionicons name="share-outline" size={30} color={"gray"} />
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex-row items-center justify-start px-5 pt-1 space-x-3">
              <View>
                <Image
                  source={{
                    uri: room.roomImage,
                  }}
                  className=" rounded-lg"
                  style={styles.image}
                />
              </View>
              <View className="space-y-2">
                <Text className="text-gray-800 font-bold text-[13px] w-[230px]">
                  {room.roomTitle}
                </Text>
                <Text className="text-gray-400 font-semibold text-[11px]">
                  Grand Deluks Double
                </Text>
                <View className="flex-row items-center space-x-2">
                  <Ionicons name="people-outline" size={18} color={"#12C6FF"} />
                  <Text className="text-gray-500 font-semibold text-[12px]">
                    {room.bed}, {room.guests} Adults
                  </Text>
                </View>
              </View>
            </View>
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              showsVerticalScrollIndicator={false}
            >
              <View className="flex  justify-start p-5 space-y-4">
                <Text className="text-gray-700 font-bold text-[13px]">
                  Saved Cards
                </Text>
                {cards.map((card) => (
                  <View
                    key={card.id}
                    className="flex-row items-center justify-between p-3 border-2 border-gray-300 rounded-lg"
                  >
                    <View className="flex-row items-center space-x-4">
                      <View className="p-2 border-2 border-gray-200 rounded-lg">
                        <PaymentIcon type={card.type} />
                      </View>
                      <View>
                        <Text>{card.type}</Text>
                        <Text>{card.number}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
              <View className="px-5 space-y-4">
                <Text className="text-gray-700 font-bold text-[13px]">
                  Payment Method
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    setPaymentMethod("Cash");
                  }}
                  className="flex-row items-center justify-between  rounded-lg"
                >
                  <View
                    className={`flex-row items-center w-full space-x-4  p-3 border-2  rounded-lg ${
                      paymentMethod === "Cash"
                        ? "border-blue-500 bg-blue-100"
                        : "border-gray-300"
                    }`}
                  >
                    <View
                      className={`p-2 border-2 ${
                        paymentMethod === "Cash"
                          ? "border-blue-500"
                          : "border-gray-300"
                      } rounded-xl`}
                    >
                      <Ionicons name="cash-outline" size={25} color={"gray"} />
                    </View>
                    <View>
                      <Text
                        className={` ${
                          paymentMethod === "Cash"
                            ? "text-blue-700"
                            : "text-gray-600"
                        } font-bold  rounded-xl`}
                      >
                        Cash
                      </Text>
                      <Text
                        className={`${
                          paymentMethod === "Cash"
                            ? "text-blue-500 text-[12px] font-semibold"
                            : "text-gray-400 text-[12px] font-semibold"
                        }`}
                      >
                        Pay Cash on Check In
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setPaymentMethod("paypal");
                  }}
                  className="flex-row items-center justify-between  rounded-lg"
                >
                  <View
                    className={`flex-row items-center w-full space-x-4  p-3 border-2  rounded-lg ${
                      paymentMethod === "paypal"
                        ? "border-blue-500 bg-blue-100"
                        : "border-gray-300"
                    }`}
                  >
                    <View
                      className={`p-2 border-2 ${
                        paymentMethod === "paypal"
                          ? "border-blue-500"
                          : "border-gray-300"
                      } rounded-xl`}
                    >
                      <PaymentIcon type="paypal" />
                    </View>
                    <View>
                      <Text
                        className={` ${
                          paymentMethod === "paypal"
                            ? "text-blue-700"
                            : "text-gray-600"
                        } font-bold rounded-xl`}
                      >
                        PayPal
                      </Text>
                      <Text
                        className={`${
                          paymentMethod === "paypal"
                            ? "text-blue-500 text-[12px] font-semibold"
                            : "text-gray-400 text-[12px] font-semibold"
                        }`}
                      >
                        Pay with Paypal
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setPaymentMethod("card");
                  }}
                  className="flex-row items-center justify-between  rounded-lg"
                >
                  <View
                    className={`flex-row items-center w-full space-x-4  p-3 border-2  rounded-lg ${
                      paymentMethod === "card"
                        ? "border-blue-500 bg-blue-100"
                        : "border-gray-300"
                    }`}
                  >
                    <View
                      className={`p-2 border-2 ${
                        paymentMethod === "card"
                          ? "border-blue-500"
                          : "border-gray-300"
                      } rounded-xl`}
                    >
                      <PaymentIcon type="visa" />
                    </View>
                    <View>
                      <Text
                        className={` ${
                          paymentMethod === "card"
                            ? "text-blue-700"
                            : "text-gray-600"
                        } font-bold rounded-xl`}
                      >
                        Card
                      </Text>
                      <Text
                        className={`${
                          paymentMethod === "card"
                            ? "text-blue-500 text-[12px] font-semibold"
                            : "text-gray-400 text-[12px] font-semibold"
                        }`}
                      >
                        Pay with Debit or Credit Card
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
          <View className="p-3 px-6 pb-5  flex-row items-center justify-between  absolute bottom-0 bg-[#F8F8FF] w-full">
            <View className="space-y-2">
              <View className="flex-row items-center space-x-1">
                <Text className="text-[15px] font-bold text-[#12C6FF]">
                  GH₵ {totalAmount}
                </Text>
                <Text className="text-gray-400 text-[12px] font-semibold">
                  per room per night
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={handleMakePayment}
              className="bg-[#12C6FF] flex items-center py-4 rounded-lg  px-4"
            >
              <Text className="text-white font-bold ">
                {paymentMethod === "Cash" ? "Confirm booking" : "Pay Now"}
              </Text>
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
                Confirm your Payment
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

export default PaymentScreen;
