import React, { useState, useContext } from "react";
// import 'react-native-gesture-handler';
import FlashMessage from "react-native-flash-message";
import { NativeBaseProvider } from "native-base";
import { store } from "./src/redux/store/store";
import { Provider } from "react-redux";
import AppNavigate from "./src/StackNavigation/AppNavigate";

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <AppNavigate />
      </NativeBaseProvider>
      <FlashMessage position="top" />
    </Provider>
  );
}
