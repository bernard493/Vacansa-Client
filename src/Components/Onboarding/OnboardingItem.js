import {
  View,
  Text,
  Image,
  useWindowDimensions,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React from "react";

const OnboardingItem = ({ item }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={{ width }} className="">
      <Image source={item.img} style={[{ width, resizeMode: "contain" }]}/>
      <View className="flex items-center justify-center space-y-4 px-2">
        <Text className={"text-3xl font-bold text-gray-700 "}>{item.title}</Text>
        <Text className={"text-sm font-base text-gray-500  "}>{item.text}</Text>
      </View>
    </View>
  );
};
export default OnboardingItem;
