import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  room: {},
  orderInfor: {
    room_id: "",
    hotel_id: "",
    checkingInDate: "",
    checkingOutDate: "",
    bookingName: "",
    bookingEmail: "",
    bookingNumber: "",
  },
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCart: (state, action) => {
      //   state.hotelRoom = action.payload.hotelRoom;
      state.room = { ...action.payload.room };
      state.orderInfor = { ...action.payload.orderInfor };
      //   console.log("action",action.payload.bookingName);
    },
  },
});

export const { addCart } = cartSlice.actions;
export default cartSlice.reducer;
