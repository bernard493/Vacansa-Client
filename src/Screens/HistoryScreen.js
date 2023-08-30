import {
  View,
  Text,
  SafeAreaView,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Animated,
} from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { getAllOrders } from "../api/Order_Api";
import ActiveOrders from "../Components/Orders/ActiveOrders";
import DoneOrders from "../Components/Orders/DoneOrders";
import { Center, Skeleton, VStack, HStack } from "native-base";
import EmptyOrderScreen from "./EmptyOrderScreen";
import { useSelector } from "react-redux";
const HistoryScreen = () => {
  const [selectedTap, setSelectedTap] = useState("activeOrders");
  const { allOrders, ordersTotalCount } = useSelector(({ orders }) => orders);
  const [totalCompletedOrdersCount, setTotalCompletedOrdersCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const animateFadeAnim = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const handleEvent = () => {
    // handle the specific event that triggers the animation
    animateFadeAnim();
  };

  useEffect(() => {
    handleEvent();
  }, [selectedTap]);

  return (
    <SafeAreaView className="bg-white flex-1 pt-10 ">
      <View className="px-5 pt-5">
        <Text className="text-[25px] font-bold text-gray-700">My Booking</Text>
        <View className=" bg-slate-100  p-1 rounded-xl space-x-3 mt-5  mb-2 flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => setSelectedTap("activeOrders")}
            className={` ${
              selectedTap === "activeOrders" ? "bg-white" : ""
            } flex-1 rounded-xl py-4 px-5`}
          >
            <Text
              className={`${
                selectedTap === "activeOrders"
                  ? "text-gray-700 font-bold"
                  : "text-gray-500 font-semibold"
              } text-[12px] text-center  `}
            >
              Active Orders
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectedTap("doneOrders")}
            className={` ${
              selectedTap === "doneOrders" ? "bg-white" : ""
            } flex-1 rounded-xl py-4 px-5`}
          >
            <Text
              className={`${
                selectedTap === "doneOrders"
                  ? "text-gray-700 font-bold"
                  : "text-gray-500 font-semibold"
              } text-[12px] text-center  `}
            >
              Done Orders
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          showsVerticalScrollIndicator={false}
          automaticallyAdjustContentInsets={true}
        >
          {selectedTap === "activeOrders" ? (
            <>
              {ordersTotalCount > 0 ? (
                <>
                  {allOrders.map((order) => (
                    <View
                      key={order._id}
                      className="border border-gray-200 bg-slate-50  rounded-lg my-5 p-3"
                    >
                      <ActiveOrders order={order} />
                    </View>
                  ))}
                </>
              ) : (
                <EmptyOrderScreen />
              )}
            </>
          ) : (
            <>
              {totalCompletedOrdersCount > 0 ? (
                <>
                  {allOrders.map((order) => (
                    <DoneOrders order={order} />
                  ))}
                </>
              ) : (
                <EmptyOrderScreen />
              )}
            </>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 120,
  },
});
export default HistoryScreen;

{
  /* <FlatList
              refreshing={refreshing}
              onRefresh={onRefresh}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              data={allOrders}
              renderItem={({ item }) => (
                <ActiveOrders order={item} loading={loading} />
              )}
              horizontal={false}
              showsVerticalScrollIndicator={false}
              // pagingEnabled
              bounces={false}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{
                paddingBottom: 130,
              }}
            /> */
}
