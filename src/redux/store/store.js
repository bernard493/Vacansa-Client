import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/User/userSlice";
import cartSlice from "../features/cartSlice";
import OrderSlice from "../features/ordersSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
    orders: OrderSlice,
  },
});
