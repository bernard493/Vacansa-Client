import { View, Animated, TouchableOpacity } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import Svg, { Circle, G } from "react-native-svg";
import Ionicons from "@expo/vector-icons/Ionicons";

const OnboardingNextButton = ({ percentage ,buttonScrollTo }) => {
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);

  const animation = (toValue) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation(percentage);
  }, [percentage]);

  useEffect(() => {
    progressAnimation.addListener((value) => {
      const strokeDashoffset =
        circumference - (circumference * value.value) / 100;
      if (progressRef?.current) {
        progressRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });
  }, [percentage]);

  const size = 70;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <View className="flex items-center justify-center  ">
      <Svg height={size} width={size}>
        <G rotation="-90" origin={center}>
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#E6E7E8"
            strokeWidth={strokeWidth}
          />
          <Circle
            ref={progressRef}
            cx={center}
            cy={center}
            r={radius}
            stroke="#12C6FF"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
          />
        </G>
      </Svg>
      <TouchableOpacity
      onPress={buttonScrollTo}
        activeOpacity={0.6}
        className="absolute bg-[#12C6FF] p-3  rounded-full"
      >
        <Ionicons
          name="arrow-forward-outline"
          size={23}
          color={"#fff"}
        />
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingNextButton;
