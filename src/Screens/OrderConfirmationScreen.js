import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useEffect, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";

const OrderConfirmationScreen = ({ route }) => {
  const { totalAmount, paymentMethod } = route.params;
  const { user } = useSelector((state) => state.user);

  const navigation = useNavigation();
  const animation = useRef(null);

  const showToast = () => {
    Toast.show({
      type: "success",
      text1: `Hello ${user.name.split(" ")[0]}`,
      text2: `Your Order ${"TR5456"} has been placed successful  👋`,
    });
  };

  useEffect(() => {
    showToast();
  }, []);
  return (
    <SafeAreaView className="bg-white flex-1 pt-10">
      <View className="items-center justify-center">
        <Text className="text-gray-700 font-bold text-[16px]">
          Confirmation
        </Text>
      </View>

      <View className="flex items-center justify-center space-y-10">
        <View className="items-center justify-center px-3 space-y-8">
          <LottieView
            autoPlay
            style={{
              width: 300,
              height: 300,
            }}
            source={require("../assets/orderconfirmation.json")}
          />
          <Text className="text-gray-700 font-bold text-[25px] text-center">
            Congratulations
          </Text>
          <Text className="text-gray-700 font-bold text-[15px] text-center">
            your order has been placed
          </Text>
          <Text className="text-gray-400  text-[14px] text-center">
            Order details will be sent to your email shortly
          </Text>
          <View className=" bg-slate-100  px-[70px] py-6 rounded-lg space-y-2">
            <Text className="text-gray-400  text-[14px] text-center">
              Total Order Amount{" "}
              {paymentMethod === "Cash" && "To be paid on CheckIn"}
            </Text>
            <Text className="text-gray-700 font-bold text-[22px] text-center">
              GH¢ {totalAmount}
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
              });
            }}
          >
            <Text className="text-[#12C6FF] font-bold ">Go Back To Home </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast />
    </SafeAreaView>
  );
};

export default OrderConfirmationScreen;

{
  /**/
}
