import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import React from "react";

const CarouselCardItem = ({ item }) => {
  return (
    <View className="m-2">
      <Image
        source={item.imgUrl }
        style={styles.image}
        className="rounded-xl shadow-xl"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 170,
  },
});
export default CarouselCardItem;
