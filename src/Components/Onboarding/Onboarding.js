import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useState, useRef } from "react";
import slideDate from "./slides";
import OnboardingItem from "./OnboardingItem";
import OnboardingPaginator from "./OnboardingPaginator";
import OnboardingNextButton from "./OnboardingNextButton";
import { useNavigation } from "@react-navigation/native";

const Onboarding = () => {
  const navigate = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const buttonScrollTo = () => {
    if (currentIndex < slideDate.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
    } else {
      navigate.replace("Login");
    }
  };

  return (
    <SafeAreaView className="space-y-10">
      <FlatList
        data={slideDate}
        renderItem={({ item }) => <OnboardingItem item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          }
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        scrollEventThrottle={32}
        ref={slidesRef}
      />

      <View className=" flex-row items-center justify-between mx-5 py-5">
        <View>
          <OnboardingPaginator data={slideDate} scrollX={scrollX} />
        </View>
        <View className="flex-row items-center justify-center">
          <TouchableOpacity
            onPress={() => {
              navigate.replace("Login");
            }}
            className="pr-6 text-gray-600 text-md font-semibold"
          >
            <Text className="">Skip</Text>
          </TouchableOpacity>
          <OnboardingNextButton
            percentage={(currentIndex + 1) * (100 / slideDate.length)}
            buttonScrollTo={buttonScrollTo}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
