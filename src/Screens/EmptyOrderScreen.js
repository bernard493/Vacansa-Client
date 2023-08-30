import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import COLORS from "../constants/style"
const EmptyOrderScreen = () => {
  return (
    <SafeAreaView>
      <View className="flex items-center justify-center space-y-5">
        <View className="items-center justify-center px-3 ">
          <LottieView
            autoPlay
            style={{
              width: 300,
              height: 300,
            }}
            source={require("../assets/emptyOrder.json")}
          />
        </View>
        <View className="space-y-5 px-4">
          <Text className="font-bold text-center ">Order Empty</Text>
          <Text className="text-center">
            Your Order is Empty,Search hotels,apartments,etc and start booking
          </Text>
        </View>
        <View>
          <TouchableOpacity className={`bg-[${COLORS.primary}] flex items-center py-3 rounded-lg  px-6`}>
            <Text className="text-white font-bold">Book a Hotel</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row space-x-1">
          <Text>Cant find your booking? </Text>
          <TouchableOpacity>
            <Text className={`text-[${COLORS.primary}]  font-bold`}>Get Help</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EmptyOrderScreen;
