import React, { useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";
import moment from "moment";

const BookingDateModel = ({
  bookingDate,
  openBookingDateModel,
  setOpenBookingDateModel,
  setBookingDate,
}) => {
  const today = new Date();
  const startDate = moment().format();
  //   getFormatedDate(
  //     today.setDate(today.getDate() + 1),
  //     "YYYY-MM-DD"
  //   );

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={openBookingDateModel}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Select Date</Text>
            <DatePicker
              onSelectedChange={(date) => setBookingDate(date)}
              minimumDate={startDate}
              selected={bookingDate}
              mode="calendar"
            />
            <TouchableOpacity
              onPress={() => setOpenBookingDateModel(!openBookingDateModel)}
              className='p-2 bg-[#12C6FF] rounded-xl'
            >
              <Text style={styles.textStyle}>save</Text>
            </TouchableOpacity>
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
    // margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    // paddingBottom: 35,
    // paddingLeft: 35,
    alignSelf: "stretch",
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
    marginBottom: 5,
    textAlign: "center",
  },
});

export default BookingDateModel;
