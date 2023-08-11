import {
  View,
  useWindowDimensions,
  StyleSheet,
  ImageBackground,
  Image,
  Text,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";

const HotelDetailImageCard = ({ item }) => {
  const { width, height } = useWindowDimensions();


  return (
    <View  className="brightness-50 ">
      <ImageBackground
        source={{ uri: item }}
        style={[styles.bgImage, { width }]}
        className="rounded-b-3xl"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bgImage: {
    height: 330,
    // opacity: 0.6,
    // borderBOttomRightRadius: 20,
    // borderBottomLeftRadius:  50
  },
});
export default HotelDetailImageCard;
