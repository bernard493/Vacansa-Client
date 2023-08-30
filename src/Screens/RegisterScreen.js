import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import React, { useReducer } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { useDispatch } from "react-redux";
import COLORS from "../constants/style";
import { setUser } from "../redux/features/User/userSlice";
import {
  Spinner,
  HStack,
  Heading,
  Center,
  NativeBaseProvider,
} from "native-base";
import * as SecureStore from "expo-secure-store";
import { registerUser } from "../api/user_Api";
import AuthInput from "../Components/InputComponents/AuthInput";

const initialState = {
  name: "",
  email: "",
  password: "",
  phoneNumber: "",
  confirmPassword: "",
  showPassword: true,
  showConfirmPassword: true,
  isError: false,
  loggingIn: false,
  isFocus: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "SET_CONFIRM_PASSWORD":
      return { ...state, confirmPassword: action.payload };
    case "SET_PHONE_NUMBER":
      return { ...state, phoneNumber: action.payload };
    case "SET_IS_ERROR":
      return { ...state, isError: action.payload };
    case "SET_LOGGING_IN":
      return { ...state, loggingIn: action.payload };
    case "SET_IS_FOCUS":
      return { ...state, isFocus: action.payload };
    case "SET_SHOW_PASSWORD":
      return { ...state, showPassword: action.payload };
    case "SET_SHOW_CONFIRM_PASSWORD":
      return { ...state, showConfirmPassword: action.payload };
    default:
      return state;
  }
};

const RegisterScreen = () => {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const [state, dispatchState] = useReducer(reducer, initialState);

  const validateForm = () => {
    if (
      state.name === "" ||
      state.email === "" ||
      state.phoneNumber === "" ||
      state.password === "" ||
      state.confirmPassword === ""
    ) {
      showMessage({
        message: "Invalid Details",
        description: "Please fill all the details",
        type: "danger",
      });
      return false;
    } else if (state.password !== state.confirmPassword) {
      showMessage({
        message: "Password",
        description: "Please check your passwords again",
        type: "danger",
      });
      return false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(state.email)) {
      showMessage({
        message: "Invalid Email",
        description: "Please enter a valid email",
        type: "danger",
      });
      return false;
    }
    return true;
  };

  const handelRegister = async () => {
    if (validateForm()) {
      try {
        registerUser({
          name: state.name,
          email: state.email.toLocaleLowerCase(),
          password: state.password,
          phoneNumber: state.phoneNumber,
        }).then(async (response) => {
          dispatchState({ type: "SET_LOGGING_IN", payload: true });

          try {
            const data = response.data;
            if (response.status !== 200) {
              showMessage({
                message: "Email already registered",
                description: "Please User already registered try new email",
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
            console.error("try error", error);
          }
        });
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        showMessage({
          message: "Register Now try later",
          description:
            "server error Cant register new user name try again later",
          type: "danger",
        });
      }
    }
  };

  const toggleShowPassword = () => {
    dispatchState({ type: "SET_SHOW_PASSWORD", payload: !state.showPassword });
  };

  const toggleFocus = () => {
    dispatchState({
      type: "SET_IS_FOCUS",
      payload: !state.isFocus,
    });
  };

  const toggleShowConfirmPassword = () => {
    dispatchState({
      type: "SET_SHOW_CONFIRM_PASSWORD",
      payload: !state.showConfirmPassword,
    });
  };

  return (
    <ScrollView className=" bg-white flex-1 ">
      <KeyboardAvoidingView className="py-6  px-5 space-y-5">
        <View>
          <View>
            <Image
              source={require("../../assets/logo.png")}
              className="object-cover h-20 w-40 "
            />
          </View>
          <View className="">
            <Text className="font-bold text-3xl ">Hello there!</Text>
            <Text className="text-sm text-gray-500 font-medium">
              Sign up with your details
            </Text>
          </View>
        </View>
        <View className="space-y-2">
          <View>
            <AuthInput
              isFocus={state.isFocus}
              toggleFocus={toggleFocus}
              value={state.name}
              onChangeText={(text) =>
                dispatchState({ type: "SET_NAME", payload: text })
              }
              icon={"person-circle-outline"}
              inputName="Name"
              keyboardType="default"
              placeholder="Enter your Full name"
            />
          </View>
          <View>
            <AuthInput
              value={state.email}
              toggleFocus={toggleFocus}
              isFocus={state.isFocus}
              // setIsFocus={setIsFocus}
              onChangeText={(text) =>
                dispatchState({ type: "SET_EMAIL", payload: text })
              }
              icon={"mail-unread-outline"}
              inputName="Email"
              keyboardType="email-address"
              placeholder="Enter your Email"
            />
          </View>

          <View>
            <AuthInput
              value={state.phoneNumber}
              isFocus={state.isFocus}
              toggleFocus={toggleFocus}
              onChangeText={(text) =>
                dispatchState({ type: "SET_PHONE_NUMBER", payload: text })
              }
              icon={"call-outline"}
              inputName="Phone Number"
              keyboardType="numeric"
              placeholder="Enter your Phone Number"
            />
          </View>
          <View>
            <AuthInput
              value={state.password}
              isFocus={state.isFocus}
              toggleFocus={toggleFocus}
              onChangeText={(text) =>
                dispatchState({ type: "SET_PASSWORD", payload: text })
              }
              icon={"finger-print-outline"}
              inputName="Password"
              keyboardType="default"
              placeholder="Enter your Password"
              showPassword={state.showPassword}
              toggleShowPassword={toggleShowPassword}
            />
          </View>

          <View>
            <AuthInput
              value={state.confirmPassword}
              isFocus={state.isFocus}
              toggleFocus={toggleFocus}
              onChangeText={(text) =>
                dispatchState({ type: "SET_CONFIRM_PASSWORD", payload: text })
              }
              icon={"finger-print-outline"}
              inputName="Confirm Password"
              keyboardType="default"
              placeholder="Enter your Password"
              showPassword={state.showConfirmPassword}
              toggleShowConfirmPassword={toggleShowConfirmPassword}
            />
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={handelRegister}
            className={`bg-[${COLORS.primary}] h-12 flex items-center justify-center rounded-lg`}
            >
            {state.loggingIn ? (
              <HStack space={2} justifyContent="center">
                <Spinner accessibilityLabel="Loading posts" color="white" />
                <Heading color="white" fontSize="md">
                  Loading...
                </Heading>
              </HStack>
            ) : (
              <Text className="text-white text-md font-semibold">Continue</Text>
            )}
          </TouchableOpacity>
        </View>
        <View className="flex items-center justify-center space-y-5">
          <Text className="text-md text-gray-500 font-semibold">
            Or Login with
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
            Already have an account?{" "}
            <Text
              className={`text-[${COLORS.primary}] font-bold`}
              onPress={() => navigate.navigate("Login")}
            >
              Login
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default RegisterScreen;
