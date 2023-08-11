import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userToken: null,
  user: {},
  loading: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setUser: (state, action) => {
      state.userToken = action.payload.token;
      state.user = action.payload.user;
    },

    logOutUser: (state, action) => {
      state.userToken = null;
      state.user = {};
    },
  },
});

export const { setUser, logOutUser,setLoading } = userSlice.actions;
export default userSlice.reducer;
