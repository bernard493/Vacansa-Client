import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allOrders: [],
  ordersTotalCount: null,
};

export const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setAllOrders: (state, action) => {
      state.allOrders = action.payload;
    },
    setOrdersTotalCount: (state, action) => {
      state.ordersTotalCount = action.payload;
    },
  },
});

export const { setAllOrders, setOrdersTotalCount } = OrderSlice.actions;
export default OrderSlice.reducer;
