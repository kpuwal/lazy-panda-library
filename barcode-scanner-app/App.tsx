import React from 'react';
import {Text} from 'react-native';
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Main from './components/Main';
import {
  useFonts,
  Roboto_400Regular
} from "@expo-google-fonts/roboto";

export default function App() {
  let [fontsLoaded] = useFonts({Roboto_400Regular});

  if (!fontsLoaded) {
    return <Text>loading...</Text>;
  } else {
    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}
