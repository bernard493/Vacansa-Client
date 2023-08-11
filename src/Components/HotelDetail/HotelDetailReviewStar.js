import React from "react";
import { StyleSheet, View, Animated } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const HotelDetailReviewStar = ({ rating }) => {
  return (
    <View>
      <View className="flex-row">
        {[1, 2, 3, 4, 5].map((option) => (
          <Animated.View key={option}>
            <MaterialIcons
              name={Number(rating) >= option ? "star" : "star-border"}
              size={22}
              style={
                Number(rating) >= option
                  ? styles.starSelected
                  : styles.starUnselected
              }
            />
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  starUnselected: {
    color: "#aaa",
  },
  starSelected: {
    color: "#ffb300",
  },
});
export default HotelDetailReviewStar;
