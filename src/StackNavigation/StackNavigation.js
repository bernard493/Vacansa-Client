import SCREENS from "../constants/screens";
import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "../Screens/HomeScreen";

import ProfileSettingsScreen from "../Screens/ProfileSettingsScreen";
import HistoryScreen from "../Screens/HistoryScreen";
import NotificationScreen from "../Screens/NotificationScreen";
import Ionicons from "@expo/vector-icons/Ionicons";
import SearchScreen from "../Screens/SearchScreen";
import HotelDetailScreen from "../Screens/HotelDetailScreen";
import AvailableRoomsScreen from "../Screens/AvailableRoomsScreen";
import SelectedRoomDetailScreen from "../Screens/SelectedRoomDetailScreen";
import BookingDetailScreen from "../Screens/BookingDetailScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import PaymentScreen from "../Screens/PaymentScreen";
import OrderConfirmationScreen from "../Screens/OrderConfirmationScreen";
import * as SecureStore from "expo-secure-store";
import { getAllOrders } from "../api/Order_Api";
import { useDispatch } from "react-redux";
import {
  setAllOrders,
  setOrdersTotalCount,
} from "../redux/features/ordersSlice/";
import COLORS from "../constants/style";
const Stack = createNativeStackNavigator();

const Tab = createMaterialBottomTabNavigator();

//  Button TaBars on HomeScreen
const TapNavigation = () => {
  const dispatch = useDispatch();
  const [allOrdersCount, setAllOrdersCount] = useState();
  const [allNotifications, setAllNotifications] = useState(2);

  useEffect(() => {
    const getOrders = async () => {
      getAllOrders().then(async (response) => {
        try {
          const totalCount = response.data.totalCount;
          const orders = response.data.orders;

          if (response.status !== 200) {
            console.log("no orders");
          } else {
            dispatch(setAllOrders(orders));
            dispatch(setOrdersTotalCount(totalCount));
            setAllOrdersCount(totalCount);
            // await SecureStore.setItemAsync("orders", JSON.stringify(orders));
          }
        } catch (error) {
          console.error(error);
        }
      });
    };

    if (allOrdersCount === undefined) {
      getOrders();
    }
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let routeName = route.name;
          if (routeName === "HomeScreen") {
            iconName = focused ? "compass" : "compass-outline";
            size = focused ? 27 : 24;
          } else if (routeName === "HistoryScreen") {
            iconName = focused ? "receipt" : "receipt-outline";
            size = focused ? 27 : 24;
          } else if (routeName === "NotificationScreen") {
            iconName = focused ? "notifications" : "notifications-outline";
            size = focused ? 27 : 24;
          } else if (routeName === "Account") {
            iconName = focused ? "person" : "person-outline";
            size = focused ? 27 : 24;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      activeColor={COLORS.primary}
      // inactiveColor="#696969"

      barStyle={{
        backgroundColor: "#FFFAFA",
        fontSize: 10,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Explore",
        }}
      />

      <Tab.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{
          title: "My Booking",
          tabBarBadge: allOrdersCount !== 0 ? allOrdersCount : null,
        }}
      />
      <Tab.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          title: "Notification",
          tabBarBadge: allNotifications !== 0 ? allNotifications : null,
        }}
      />
      <Tab.Screen
        name="Account"
        component={ProfileScreen}
        options={{
          title: "Account",
        }}
      />
    </Tab.Navigator>
  );
};
const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} lazy>
      <Stack.Screen name={SCREENS.Home} component={TapNavigation} />
      <Stack.Screen name={SCREENS.Search} component={SearchScreen} />
      <Stack.Screen
        name={SCREENS.HotelDetails}
        component={HotelDetailScreen}
        lazy
      />
      <Stack.Screen
        name={SCREENS.AvailableRooms}
        component={AvailableRoomsScreen}
        lazy
      />
      <Stack.Screen
        name={SCREENS.SelectedRoom}
        component={SelectedRoomDetailScreen}
        lazy
      />
      <Stack.Screen
        name={SCREENS.ConfirmBookingDetails}
        component={BookingDetailScreen}
        lazy
      />
      <Stack.Screen
        name={SCREENS.Settings}
        component={ProfileSettingsScreen}
        lazy
      />
      <Stack.Screen name={SCREENS.Payment} component={PaymentScreen} lazy />
      <Stack.Screen
        name={SCREENS.OrderConfirmation}
        component={OrderConfirmationScreen}
        lazy
      />
    </Stack.Navigator>
  );
};

export default StackNavigation;
