import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  RefreshControl,
  StyleSheet,
  ScrollView,
  Button,
} from "react-native";
import React, { useEffect, useState, useReducer } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logOutUser, setUser } from "../redux/features/User/userSlice";
import * as SecureStore from "expo-secure-store";
import { Avatar } from "native-base";
import Favorite from "../Components/FavoriteCard/Favorite";
import UserDetails from "../Components/UserDetailsCard/UserDetails";
import ProfileUpdateModel from "../Components/Models/UserProfileModel/ProfileUpdateModel";
import Toast from "react-native-toast-message";
import * as ImagePicker from "expo-image-picker";
import { UpdateUserProfile, UpdateUserProfileAvatar } from "../api/user_Api";

const initialState = {
  selectedTap: "collections",
  allFavorite: [],
  userProfileImage: "",
  fileName: "",
  userName: "",
  userEmail: "",
  userNumber: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_SELECTED_TAP":
      return { ...state, selectedTap: action.payload };
    case "SET_ALL_FAVORITE":
      return { ...state, allFavorite: action.payload };
    case "SET_USER_PROFILE_IMAGE":
      return { ...state, userProfileImage: action.payload };
    case "SET_FILE_NAME":
      return { ...state, fileName: action.payload };
    case "SET_USER_NAME":
      return { ...state, userName: action.payload };
    case "SET_USER_EMAIL":
      return { ...state, userEmail: action.payload };
    case "SET_USER_NUMBER":
      return { ...state, userNumber: action.payload };
    default:
      return state;
  }
};

const ProfileScreen = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const [state, dispatchState] = useReducer(reducer, initialState);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatchState({ type: "SET_USER_NAME", payload: user.name });
    dispatchState({ type: "SET_USER_EMAIL", payload: user.email });
    dispatchState({ type: "SET_USER_NUMBER", payload: user?.phoneNumber });
  }, []);

  // Update user information with new information
  const updateUserInfor = async () => {
    try {
      const response = await UpdateUserProfile({
        name: state.userName,
        email: state.userEmail,
        phoneNumber: state.userNumber,
      });
      const { updatedUser, token } = response.data;
      if (response.status !== 200) {
        console.log(`Cant update details now try again later `);
      } else {
        //get old user data save in SecureStore
        const UserData = await SecureStore.getItemAsync("UserData");

        if (UserData) {
          // if its true  update old SecureStore date with new user infor and new  token
          await SecureStore.setItemAsync(
            "UserData",
            JSON.stringify({ token, user: updatedUser })
          );
          // and update  redux state
          dispatch(setUser({ token, user: updatedUser }));

          setModalVisible(false);
          // call tost notification
          showToast({
            type: "success",
            text2: " Your profile updated successful  👋",
          });
        }
      }
    } catch (error) {
      console.log("Error updating profile picture:", error);
      showToast({
        type: "error",
        text2: "Cant update details now try again later",
      });
    }
  };

  // Update user  Profile Picture
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    if (status === "granted") {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        const { uri } = result.assets[0];
        const imageUri =
          Platform.OS === "ios" ? uri.replace("file://", "") : uri;
        const fileName = uri.split("/").pop();
        const image = {
          name: Date.now() + `__${fileName}`,
          type: "image/png",
          uri: imageUri,
        };
        dispatchState({ type: "SET_USER_PROFILE_IMAGE", payload: imageUri });

        try {
          const response = await UpdateUserProfileAvatar(image);

          if (response.status !== 200) {
            console.log(`Cant update details now try again later `);
          } else {
            const { token, updatedUser } = response.data;

            //get old user data save in SecureStore
            const UserData = await SecureStore.getItemAsync("UserData");
            if (UserData) {
              // update old SecureStore date with new user infor and token
              await SecureStore.setItemAsync(
                "UserData",
                JSON.stringify({ token, user: updatedUser })
              );
              // and update  redux state
              dispatch(setUser({ token, user: updatedUser }));
              dispatchState({ type: "SET_USER_PROFILE_IMAGE", payload: "" });
              showToast({
                type: "success",
                text2: " Your Avatar updated successful  👋",
              });
            }
          }
        } catch (error) {
          console.log("Error updating profile picture:", error);
          showToast({
            type: "error",
            text2: "Failed to update profile picture. Please try again later.",
          });
        }
      }
    }
  };
  const showToast = (message) => {
    Toast.show({
      type: message.type,
      text1: `Hello ${user?.name.split(" ")[0]}`,
      text2: message.text2,
    });
  };

  const onRefresh = React.useCallback(() => {
    dispatchState({ type: "SET_REFRESHING", payload: true });
    setTimeout(() => {
      dispatchState({ type: "SET_REFRESHING", payload: false });
    }, 2000);
  }, []);

  const logoutUser = async () => {
    await SecureStore.deleteItemAsync("UserData");
    dispatch(logOutUser());
  };

  const toggleModal = () => {
    setModalVisible(!state.isModalVisible);
  };

  return (
    <SafeAreaView className="flex-1 bg-white pt-10">
      <View className="flex-row items-center justify-between px-3 py-2">
        <TouchableOpacity onPress={() => navigate.goBack()}>
          <Ionicons name="chevron-back-outline" size={30} color={"gray"} />
        </TouchableOpacity>
        <View className="">
          <Text className="text-gray-700 font-bold text-[16px]">Profile</Text>
        </View>
        <View className="">
          <TouchableOpacity>
            <Ionicons
              name="information-circle-outline"
              size={30}
              color={"gray"}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View className="p-5 space-y-2">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={pickImage}>
            <View>
              <Avatar
                bg="green.500"
                source={{
                  uri: state.userProfileImage
                    ? state.userProfileImage
                    : user?.avatar,
                }}
                size={"xl"}
              >
                {user?.name?.charAt(0)}
              </Avatar>
            </View>
            <View className="  z-10 flex items-center justify-center -top-6 left-19 bg-slate-500 rounded-full p-1 w-7 h-7 border-2 border-white">
              <Ionicons
                name="camera-reverse-outline"
                size={15}
                color={"white"}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Text className="text-[17px] font-bold">
            {user && `${user?.name}`}
          </Text>
        </View>
        <View className="flex-row items-center justify-between  py-2">
          <View className="space-y-5  flex-1 p-2">
            <TouchableOpacity
              onPress={() =>
                dispatchState({
                  type: "SET_SELECTED_TAP",
                  payload: "collections",
                })
              }
              className=" flex-row items-center justify-center space-x-2"
            >
              <Ionicons name="menu-outline" size={20} color={"gray"} />
              <Text
                className={`${
                  state.selectedTap === "collections"
                    ? "text-gray-600 text-md font-semibold"
                    : "text-gray-400 text-md font-semibold"
                }`}
              >
                Collections
              </Text>
            </TouchableOpacity>
            <View
              className={`${
                state.selectedTap === "collections"
                  ? "border-b-4 border-[#12C6FF]"
                  : ""
              }`}
            />
          </View>
          <View className="space-y-5  flex-1 p-2">
            <TouchableOpacity
              onPress={() =>
                dispatchState({ type: "SET_SELECTED_TAP", payload: "settings" })
              }
              className=" flex-row items-center justify-center space-x-2"
            >
              <Ionicons name="settings-outline" size={15} color={"gray"} />
              <Text
                className={`${
                  state.selectedTap === "settings"
                    ? "text-gray-600 text-md font-semibold"
                    : "text-gray-400 text-md font-semibold"
                }`}
              >
                Settings
              </Text>
            </TouchableOpacity>
            <View
              className={`${
                state.selectedTap === "settings"
                  ? "border-b-4 border-[#12C6FF]"
                  : ""
              }`}
            />
          </View>
        </View>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        className="px-5"
      >
        {state.selectedTap === "collections" ? (
          <>
            <Favorite allFavorite={state.allFavorite} />
          </>
        ) : (
          <>
            <UserDetails user={user} toggleModal={toggleModal} />
          </>
        )}

        <View className="py-7">
          <TouchableOpacity
            onPress={logoutUser}
            className="bg-[#12C6FF] h-12 flex items-center justify-center rounded-lg"
          >
            <Text className="text-white text-md font-semibold">logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <ProfileUpdateModel
        userData={user}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        showToast={showToast}
        updateUserInfor={updateUserInfor}
        userName={state.userName}
        userEmail={state.userEmail}
        userNumber={state.userNumber}
        setUserName={(name) =>
          dispatchState({ type: "SET_USER_NAME", payload: name })
        }
        setUserEmail={(email) =>
          dispatchState({ type: "SET_USER_EMAIL", payload: email })
        }
        setUserNumber={(number) =>
          dispatchState({ type: "SET_USER_NUMBER", payload: number })
        }
      />
      <Toast />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
export default ProfileScreen;
