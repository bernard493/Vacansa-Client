import { View, Animated, useWindowDimensions, StyleSheet } from "react-native";
import React from "react";
import COLORS from "../../constants/style"
const OnboardingPaginator = ({ data, scrollX }) => {
  const { width } = useWindowDimensions();
  return (
    <View className="flex-row py-3">
      {data.map((data, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 25, 10],
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            style={[styles.dot, { width: dotWidth, opacity , backgroundColor: COLORS.primary,}]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    height: 5,
    borderRadius: 5,
    marginHorizontal: 8,
  },
});

export default OnboardingPaginator;
