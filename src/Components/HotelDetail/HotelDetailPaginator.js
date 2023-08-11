import { View, Animated,StyleSheet,useWindowDimensions } from 'react-native'
import React from 'react'

const HotelDetailPaginator = ({ data, scrollX }) => {
  const { width } = useWindowDimensions();

  return (
    <View className="flex-row py-3">
    {data?.map((data, i) => {
      const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
      const dotWidth = scrollX.interpolate({
        inputRange,
        outputRange: [20, 30, 20],
        extrapolate: "clamp",
      });
      const opacity = scrollX.interpolate({
        inputRange,
        outputRange: [0.3, 1, 0.3],
        extrapolate: "clamp",
      });
      return (
        <Animated.View
          style={[styles.dot, { width: dotWidth, opacity , }]}
          key={i.toString()}
        />
      );
    })}
  </View>
);
};

const styles = StyleSheet.create({
dot: {
  height: 3,
  borderRadius: 5,
  backgroundColor: "#fff",
  marginHorizontal: 2,
},
});

export default HotelDetailPaginator