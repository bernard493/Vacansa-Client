import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import COLORS from "../../constants/style";

const AuthInput = ({
  value,
  onChangeText,
  icon,
  inputName,
  keyboardType,
  placeholder,
  showPassword,
  toggleShowPassword,
  toggleShowConfirmPassword,
  // onFocus,
  // onBlur,
  // isFocus,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  onFocus = () => {
    setIsFocus(true);
  };

  onBlur = () => {
    setIsFocus(false);
  };
  return (
    <>
      {inputName === "Password" || inputName === "Confirm Password" ? (
        <View className=" space-y-2 ">
          <Text className="text-[14px] font-bold">{inputName}</Text>
          <View
            className={`flex-row items-center  space-x-3 bg-gray-100  ${
              isFocus ? `border-2 border-[${COLORS.primary}]`: ""
            } p-3  justify-between rounded-lg`}
          >
            <Ionicons
              name={icon}
              size={25}
              color={`${isFocus ? COLORS.primary : "gray"}`}
            />
            <TextInput
              value={value}
              onFocus={onFocus}
              onBlur={onBlur}
              onChangeText={onChangeText}
              keyboardType={keyboardType}
              placeholder={placeholder}
              secureTextEntry={showPassword}
              className="flex-1  h-full"
            />
            {showPassword ? (
              <TouchableOpacity
                onPress={
                  inputName === "Password"
                    ? toggleShowPassword
                    : toggleShowConfirmPassword
                }
              >
                <Ionicons
                  name="eye"
                  size={23}
                  color={`${isFocus ? COLORS.primary : "gray"}`}
                  />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={
                  inputName === "Password"
                    ? toggleShowPassword
                    : toggleShowConfirmPassword
                }
              >
                <Ionicons
                  name="eye-off"
                  size={23}
                  color={`${isFocus ? "#12C6FF" : "gray"}`}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : (
        <View className=" space-y-2">
          <Text className="text-[14px] font-bold">{inputName}</Text>
          <View
            className={`flex-row items-center  space-x-3 bg-gray-100  ${
              isFocus ?  `border-2 border-[${COLORS.primary}]` : ""
            } p-3  justify-between rounded-lg`}
          >
            <Ionicons
              name={icon}
              size={25}
              color={`${isFocus ? COLORS.primary : "gray"}`}
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
            <Ionicons name="chevron-down-outline" size={30} color={"gray"} />
          </View>
        </View>
      )}
    </>
  );
};

export default AuthInput;
