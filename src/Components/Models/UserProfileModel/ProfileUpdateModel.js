import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import Modal from "react-native-modal";
import Ionicons from "@expo/vector-icons/Ionicons";

const TextInputComponent = ({
  inputName,
  icon,
  value,
  onChangeText,
  keyboardType,
  placeholder,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  onFocus = () => {
    setIsFocus(true);
  };

  onBlur = () => {
    setIsFocus(false);
  };

  return (
    <View className=" space-y-2">
      <Text className="text-[14px] font-bold">{inputName}</Text>
      <View
        className={`flex-row items-center  space-x-3 bg-gray-100  ${
          isFocus ? "border-2 border-[#12C6FF]" : ""
        } p-3  justify-between rounded-lg`}
      >
        <Ionicons
          name={icon}
          size={25}
          color={`${isFocus ? "#12C6FF" : "gray"}`}
        />
        <TextInput
          value={value}
          onFocus={onFocus}
          onBlur={onBlur}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          placeholder={placeholder}
          className=" w-full h-full"
        />
      </View>
    </View>
  );
};

const ProfileUpdateModel = ({
  isModalVisible,
  setModalVisible,
  updateUserInfor,
  userName,
  userEmail,
  userNumber,
  setUserName,
  setUserEmail,
  setUserNumber,
}) => {
  return (
    <View>
      <Modal
        propagateSwipe
        isVisible={isModalVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        onBackdropPress={() => setModalVisible(false)}
        style={{ margin: 0 }}
        avoidKeyboard={true}
        scrollHorizontal={true}
        backdropOpacity={0.7}
        // onBackButtonPress={() => setModalVisible(false)}
      >
        <SafeAreaView className=" bg-white flex-1 pt-6  ">
          <View className="flex-row items-center justify-between px-5">
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              className=" items-center justify-center  bg-gray-200 rounded-full p-1 "
            >
              <Ionicons name="close-outline" size={28} color={"black"} />
            </TouchableOpacity>
          </View>
          <View className="px-5 pt-10">
            <View className="space-y-2">
              <TextInputComponent
                inputName={"Full Name"}
                value={userName}
                onChangeText={setUserName}
                icon={"person-circle-outline"}
                keyboardType="default"
                placeholder="Enter your Full name"
              />

              <View className="space-y-2">
                <TextInputComponent
                  inputName={"Email"}
                  value={userEmail}
                  onChangeText={setUserEmail}
                  icon={"mail-unread-outline"}
                  keyboardType="default"
                  placeholder="Enter your Full name"
                />
              </View>
              <View className="space-y-2">
                <TextInputComponent
                  inputName={"Phone Number"}
                  value={userNumber.toString()}
                  onChangeText={setUserNumber}
                  icon={"call-outline"}
                  keyboardType="number-pad"
                  placeholder="Enter your Phone Number"
                />
              </View>
            </View>
          </View>
          <View className="p-5 absolute bottom-5 w-full">
            <TouchableOpacity
              onPress={updateUserInfor}
              className="bg-[#12C6FF] h-12 flex items-center justify-center rounded-lg"
            >
              <Text className="text-white text-md font-semibold">Save</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default ProfileUpdateModel;
