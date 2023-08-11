import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AuthStack from "./AuthStack";
import StackNavigation from "./StackNavigation";
import { NavigationContainer } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { setUser, setLoading } from "../redux/features/User/userSlice";
import { View } from "native-base";
import { ActivityIndicator } from "react-native";

const AppNavigate = () => {
  const dispatch = useDispatch();
  const { userToken, loading } = useSelector((state) => state.user);

  useEffect(() => {
    const getSavedUserData = async () => {
      const UserData = await SecureStore.getItemAsync("UserData");

      if (UserData) {
        const { token, user } = JSON.parse(UserData);
        dispatch(setUser({ token, user }));
      }
      dispatch(setLoading(false));
    };

    if (!userToken) {
      getSavedUserData();
    }
  }, [userToken]);

  return (
    <>
      {loading && (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size={"large"} />
        </View>
      )}
      {!loading && (
        <NavigationContainer>
          {userToken !== null ? <StackNavigation /> : <AuthStack />}
        </NavigationContainer>
      )}
    </>
  );
};

export default AppNavigate;
