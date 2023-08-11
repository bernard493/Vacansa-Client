import React, { useRef ,useState} from "react";
import { View, Animated,FlatList } from "react-native";
import CarouselCardItem from "./CarouselCardItem";
import data from "./data";
import OnboardingPaginator from "../Onboarding/OnboardingPaginator";

const CarouselCards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  

  return (
    <View className={"flex items-center justify-center"}>
      <FlatList
        data={data}
        renderItem={({ item }) => <CarouselCardItem item={item} />}
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
      <OnboardingPaginator data={data} scrollX={scrollX} />
    </View>
  );
};

export default CarouselCards;
