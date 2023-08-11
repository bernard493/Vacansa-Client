import { Input } from "native-base";
import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";

const BookingDetailModel = ({
  openModel,
  setOpenModel,
  bookingName,
  setBookingName,
  bookingEmail,
  setBookingEmail,
  bookingNumber,
  setBookingNumber,
}) => {
  const cancelModel = () => {
    setOpenModel(!openModel);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={openModel}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setOpenModel(!openModel);
        }}
      >
        <View style={styles.centeredView}>
          <View
            style={styles.modalView}
            className="bg-white p-3 w-80 rounded-lg"
          >
            <View className="flex-row items-center justify-between">
              <Text className="text-gray-700 font-bold text-[13px]">
                Booking Details
              </Text>
              <TouchableOpacity
                className="text-[#12C6FF] font-bold text-[13px]"
                onPress={cancelModel}
              >
                <Text className="font-semibold text-red-500">Cancel</Text>
              </TouchableOpacity>
            </View>
            <View className="space-y-5 pt-6 pb-8 px-5">
              <View>
                <Input
                  value={bookingName}
                  onChangeText={setBookingName}
                  placeholder="Enter your name"
                  keyboardType="default"
                  _light={{
                    bg: "coolGray.100",
                    _hover: {
                      bg: "coolGray.200",
                    },
                    _focus: {
                      bg: "coolGray.200:alpha.70",
                    },
                  }}
                  _dark={{
                    bg: "coolGray.800",
                    _hover: {
                      bg: "coolGray.900",
                    },
                    _focus: {
                      bg: "coolGray.900:alpha.70",
                    },
                  }}
                />
              </View>
              <View>
                <Input
                  value={bookingEmail}
                  onChangeText={setBookingEmail}
                  placeholder="Enter your Email"
                  keyboardType="email-address"
                  _light={{
                    bg: "coolGray.100",
                    _hover: {
                      bg: "coolGray.200",
                    },
                    _focus: {
                      bg: "coolGray.200:alpha.70",
                    },
                  }}
                  _dark={{
                    bg: "coolGray.800",
                    _hover: {
                      bg: "coolGray.900",
                    },
                    _focus: {
                      bg: "coolGray.900:alpha.70",
                    },
                  }}
                />
              </View>
              <View>
                <Input
                  value={bookingNumber}
                  onChangeText={setBookingNumber}
                  placeholder="Enter  Phone Number"
                  keyboardType="numeric"
                  _light={{
                    bg: "coolGray.100",
                    _hover: {
                      bg: "coolGray.200",
                    },
                    _focus: {
                      bg: "coolGray.200:alpha.70",
                    },
                  }}
                  _dark={{
                    bg: "coolGray.800",
                    _hover: {
                      bg: "coolGray.900",
                    },
                    _focus: {
                      bg: "coolGray.900:alpha.70",
                    },
                  }}
                />
              </View>
            </View>
            <View className="flex-row items-center justify-end">
              <TouchableOpacity
                className="py-2 px-4 bg-[#12C6FF]  rounded-lg"
                onPress={() => setOpenModel(false)}
              >
                <Text className="text-white font-semibold text-[13px]">
                  Save Details
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
export default BookingDetailModel;
