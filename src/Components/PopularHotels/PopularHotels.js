import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import PopularHotelCard from "./PopularHotelCard";
import { Center, Skeleton, VStack, HStack } from "native-base";

const PopularHotels = ({ popularHotels,loading }) => {
  return (
    <View className="space-y-2">
      <View className="flex-row items-center justify-between">
        <Text className="text-gray-700 font-bold  text-md">Popular Hotels</Text>
        <TouchableOpacity>
          <Text className="text-gray-400 font-semibold text-sm">See All</Text>
        </TouchableOpacity>
      </View>
      { !loading ? (
        <FlatList
          data={popularHotels}
          renderItem={({ item }) => <PopularHotelCard item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          // pagingEnabled
          bounces={false}
          keyExtractor={(item) => item._id}
        />
      ) : (
        <Center w="100%">
          <HStack
            w="90%"
            maxW="400"
            borderWidth="1"
            space={8}
            rounded="md"
            _dark={{
              borderColor: "coolGray.500",
            }}
            _light={{
              borderColor: "coolGray.200",
            }}
            p="4"
          >
            <Skeleton flex="1" h="150" rounded="md" startColor="coolGray.100" />
            <VStack flex="3" space="4">
              <Skeleton startColor="amber.300" />
              <Skeleton.Text />
              <HStack space="2" alignItems="center">
                <Skeleton size="5" rounded="full" />
                <Skeleton h="3" flex="2" rounded="full" />
                <Skeleton
                  h="3"
                  flex="1"
                  rounded="full"
                  startColor="indigo.300"
                />
              </HStack>
            </VStack>
          </HStack>
        </Center>
      )}
    </View>
  );
};

export default PopularHotels;
