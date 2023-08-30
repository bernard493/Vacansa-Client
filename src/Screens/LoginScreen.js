import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState, useReducer } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/User/userSlice";
import {
  Spinner,
  HStack,
  Heading,
  Center,
  NativeBaseProvider,
} from "native-base";
import { showMessage } from "react-native-flash-message";
import COLORS from "../constants/style";
import { userLogin } from "../api/user_Api";
import AuthInput from "../Components/InputComponents/AuthInput";

const initialState = {
  email: "",
  password: "",
  showPassword: true,
  loading: false,
  isError: false,
  loggingIn: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_SHOW_PASSWORD":
      return { ...state, showPassword: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_IS_ERROR":
      return { ...state, isError: action.payload };
    case "SET_LOGGING_IN":
      return { ...state, loggingIn: action.payload };
    default:
      return state;
  }
};

const LoginScreen = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const [state, dispatchState] = useReducer(reducer, initialState);

  const handleUserLogin = async () => {
    if (state.email === "" || state.password === "") {
      showMessage({
        message: "Invalid Details",
        description: "Please fill all the details",
        type: "danger",
      });
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(state.email)) {
      showMessage({
        message: "Invalid Email",
        description: "Please enter a valid email",
        type: "danger",
      });
    } else {
      try {
        const response = await userLogin({
          email: state.email.toLocaleLowerCase(),
          password: state.password,
        });
        dispatchState({ type: "SET_LOGGING_IN", payload: true });
        const data = response.data;

        if (response.status !== 200) {
          dispatchState({ type: "SET_IS_ERROR", payload: true });
          showMessage({
            message: "Incorrect",
            description: "Incorrect Email or Password",
            type: "danger",
          });
          dispatchState({ type: "SET_LOGGING_IN", payload: false });
        } else {
          const { token, user } = data;
          await SecureStore.setItemAsync(
            "UserData",
            JSON.stringify({ token, user })
          );
          dispatch(setUser({ token, user }));
          dispatchState({ type: "SET_LOGGING_IN", payload: false });
        }
      } catch (error) {
        console.error(error);
        showMessage({
          message: "Server Error",
          description: "server error Cant Login  now try again later",
          type: "danger",
        });
        dispatchState({ type: "SET_LOGGING_IN", payload: false });
      }
    }
  };

  const toggleShowPassword = () => {
    dispatchState({ type: "SET_SHOW_PASSWORD", payload: !state.showPassword });
  };

  return (
    <SafeAreaView className="bg-white flex-1">
      {state.loading ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            flex: 1,
          }}
        >
          <Text style={{ marginRight: 10 }}>Loading...</Text>
          <ActivityIndicator size="large" color={"red"} />
        </View>
      ) : (
        <KeyboardAvoidingView className="pt-5 px-5 space-y-7">
          <View>
            <View>
              <Image
                source={require("../../assets/logo.png")}
                className="object-cover h-20 w-40 "
              />
            </View>
            <View className="">
              <Text className="font-bold text-3xl ">Welcome back!</Text>
              <Text className="text-sm text-gray-500 font-medium">
                Login to your Vacanza account..
              </Text>
            </View>
          </View>
          <View className="space-y-6">
            <View>
              <AuthInput
                value={state.email}
                onChangeText={(text) =>
                  dispatchState({ type: "SET_EMAIL", payload: text })
                }
                // isFocus={isFocus}
                // onBlur={onBlur}
                // onFocus={onFocus}
                icon={"mail-unread-outline"}
                inputName="Email"
                keyboardType="email-address"
                placeholder="Enter your Email"
              />
            </View>
            <View>
              <AuthInput
                value={state.password}
                onChangeText={(text) =>
                  dispatchState({ type: "SET_PASSWORD", payload: text })
                }
                // isFocus={isFocus}
                // onBlur={onBlur}
                // onFocus={onFocus}
                icon={"finger-print-outline"}
                inputName="Password"
                keyboardType="default"
                placeholder="Enter your Password"
                showPassword={state.showPassword}
                toggleShowPassword={toggleShowPassword}
              />
            </View>
            <Text className="text-sm text-gray-700">Remember me</Text>
          </View>
          <View>
            <TouchableOpacity
              onPress={handleUserLogin}
              className={`bg-[${COLORS.primary}] h-12 flex items-center justify-center rounded-lg`}
              disabled={state.loggingIn}
            >
              {state.loggingIn ? (
                <HStack space={2} justifyContent="center">
                  <Spinner accessibilityLabel="Loading posts" color="white" />
                  <Heading color="white" fontSize="md">
                    Loading...
                  </Heading>
                </HStack>
              ) : (
                <Text className="text-white text-md font-semibold">
                  Continue
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <View className="flex items-center justify-center space-y-5">
            <Text className="text-md text-gray-500 font-semibold">
              Or Login
            </Text>
            <View className="flex-row space-x-6">
              <TouchableOpacity className="bg-[#12C6FF] flex items-center justify-center rounded-full p-3">
                <Ionicons name="logo-twitter" size={25} color={"#FFFFFF"} />
              </TouchableOpacity>
              <TouchableOpacity className="bg-[#FFFFFF] flex items-center justify-center rounded-full">
                <Ionicons name="logo-google" size={35} color={"gray"} />
              </TouchableOpacity>
              <TouchableOpacity className="bg-[#4867AA] flex items-center justify-center rounded-full p-3">
                <Ionicons name="logo-facebook" size={25} color={"#FFFFFF"} />
              </TouchableOpacity>
            </View>
            <Text className="text-md text-gray-500 font-semibold">
              Don't have an account?{"  "}
              <Text
                className={`text-[${COLORS.primary}] font-bold`}
                onPress={() => navigate.navigate("Register")}
              >
                Sing Up
              </Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;
