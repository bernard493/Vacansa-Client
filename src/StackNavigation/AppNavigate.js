import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AuthStack from "./AuthStack";
import StackNavigation from "./StackNavigation";
import { NavigationContainer } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { setUser, setLoading } from "../redux/features/User/userSlice";
import { View } from "native-base";
import { ActivityIndicator } from "react-native";



// The AppNavigate function is responsible for handling the navigation logic of the app.
//  It checks if the user is already logged in by retrieving the user token from the Redux store.
//  If the user token is not available, it retrieves the saved user data from the device's 
// secure storage and updates the Redux store with the user token and user information. Finally,
//  it renders the appropriate navigation stack based on the user token.


const AppNavigate = () => {
  const dispatch = useDispatch();
  const { userToken, loading } = useSelector((state) => state.user);

  const getSavedUserData = async () => {
    const UserData = await SecureStore.getItemAsync("UserData");

    if (UserData) {
      const { token, user } = JSON.parse(UserData);
      dispatch(setUser({ token, user }));
    }
    dispatch(setLoading(false));
  };

  useEffect(() => {
    if (!userToken) {
      getSavedUserData();
    }
  }, []);

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
