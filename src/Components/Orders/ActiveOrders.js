import { View, Text, StyleSheet, Image, Animated } from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Center, Skeleton, VStack, HStack } from "native-base";
import { useDateConvert } from "../../CustomHooks/useDateConvert";
import { TouchableOpacity } from "react-native";
import COLORS  from "../../constants/style"

const ActiveOrders = ({ order }) => {
  const { room } = order;
  const [showDetails, setShowDetails] = useState(false);
  const animated = new Animated.Value(0);
  const duration = 900;

  
  return (
   
      <View className="space-y-4">
        <View className="flex-row items-center justify-between ">
          <View>
            <Text className="text-md font-semibold">Order Status</Text>
          </View>
          <View
            className={` ${
              order.status == "pending"
                ? "bg-gray-200 "
                : order.status == "confirmed"
                ? "bg-blue-100 "
                : order.status == "canceled"
                ? "bg-red-100 "
                : order.status == "completed"
                ? "bg-green-100 "
                : "bg-gray-100 "
            }  px-3 py-1 rounded-xl `}
          >
            <Text className="text-[12px] text-gray-800 ">
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center justify-start my-2  pt-1 space-x-3">
          <View>
            <Image
              source={{
                uri: room.image[0],
              }}
              className=" rounded-lg"
              style={styles.image}
            />
          </View>
          <View className="space-y-2 ">
            <Text className="text-gray-800 font-bold text-[12px] w-[170px] ">
              {room.roomTitle}
            </Text>
            <Text className="text-gray-400 font-semibold text-[11px]">
              Grand Deluks Double
            </Text>
            <View className="flex-row items-center space-x-2">
              <Ionicons name="people-outline" size={18} color={COLORS.primary} />
              <Text className="text-gray-500 font-semibold text-[12px]">
                {room.bed}, {room.guests} Adults
              </Text>
            </View>
          </View>
        </View>
        <View className=" ">
          <View className="flex-row items-center justify-between">
            <View className="space-y-2">
              <Text className="text-gray-400 font-semibold text-[12px]">
                Check-in
              </Text>
              <Text className="text-gray-700 font-bold text-[13px]">
                {useDateConvert(order.checkingInDate)}
              </Text>
            </View>
            <View className="border-t-2 border-gray-300 w-20" />
            <View className="space-y-2">
              <Text className="text-gray-400 font-semibold text-[12px]">
                Check-out
              </Text>
              <Text className="text-gray-700 font-bold text-[13px]">
                {useDateConvert(order.checkingOutDate)}
              </Text>
            </View>
          </View>
          <Animated.View
            className={`${showDetails ? "block" : "hidden"}`}
            style={[{ transform: [{ translateY: animated }] }]}
          >
            <View className="bg-gray-50 px-4 py-7 rounded-lg  space-y-5">
              <View className="flex-row items-center justify-between">
                <Text className="text-gray-700 font-bold text-[16px]">
                  Booking Details
                </Text>
              </View>
              <View className="space-y-3">
                <Text className="text-gray-700 font-bold text-[12px]">
                  Mr {order.bookingName}
                </Text>
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center justify-start space-x-2">
                    <Ionicons name="mail-outline" size={18} color={"black"} />
                    <Text className="text-gray-500 font-semibold text-[12px]">
                      Email
                    </Text>
                  </View>
                  <Text className="  text-[14px]">{order.bookingEmail}</Text>
                </View>
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center justify-start space-x-2">
                    <Ionicons name="call-outline" size={18} color={"black"} />
                    <Text className="text-gray-500 font-semibold text-[12px]">
                      Phone
                    </Text>
                  </View>
                  <Text className="  text-[14px]">{order.bookingNumber}</Text>
                </View>
              </View>
            </View>

            <View className="bg-gray-50 px-4 py-5 rounded-lg  space-y-5">
              <View className="flex-row items-center justify-between">
                <Text className="text-gray-700 font-bold text-[16px]">
                  Payment Infor
                </Text>
              </View>
              <View className="space-y-3">
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center justify-start space-x-2">
                    <Ionicons name="wallet-outline" size={18} color={"black"} />
                    <Text className="text-gray-500 font-semibold text-[12px]">
                      Payment Method
                    </Text>
                  </View>
                  <Text className=" text-[14px]">{order.paymentMethod}</Text>
                </View>
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center justify-start space-x-2">
                    <Ionicons name="cash-outline" size={18} color={"black"} />
                    <Text className="text-gray-500 font-semibold text-[12px]">
                      {order.paymentMethod === "Cash"
                        ? "Total Amount To  Pay"
                        : "Total Amount Paid"}
                    </Text>
                  </View>
                  <Text className="  text-[14px]">
                    GH¢ {order.totalAmountPaid}
                  </Text>
                </View>
              </View>
            </View>
          </Animated.View>
          <View className="flex items-center pt-5">
            <TouchableOpacity
              onPress={() => setShowDetails(!showDetails)}
              className={`bg-[${COLORS.primary}] py-2 px-3 rounded-lg flex-row items-center justify-center space-x-3 animate-bounce`}
            >
              <Text className="text-white">More Details</Text>
              {showDetails ? (
                <Ionicons name="chevron-up-outline" size={18} color={"white"} />
              ) : (
                <Ionicons
                  name="chevron-down-outline"
                  size={18}
                  color={"white"}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
  );
};
const styles = StyleSheet.create({
  image: {
    height: 90,
    width: 120,
  },
});
export default ActiveOrders;
