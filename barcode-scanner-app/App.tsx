import React, {useState, useEffect} from 'react';
import { Provider } from "react-redux";
import { Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { store } from './redux/store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { APP_ENV_IP, APP_ENV_ADDRESS } from '@env';

const isLocal = true;

import Main from './components/Main';

import { useFonts, Roboto_400Regular } from "@expo-google-fonts/roboto";

export default function App() {
  const [isConnected, setConnected] = useState(false);
  let [fontsLoaded] = useFonts({Roboto_400Regular});

  const checkConnection = async () => {
    try {
      await fetch(`${isLocal ? APP_ENV_IP : APP_ENV_ADDRESS}/`);
      console.log('checking?')
      setConnected(true);
    } catch (err) {
      console.log('checked!')
      setConnected(false)
    }
  }

  useEffect(() => {checkConnection()});

  if (!fontsLoaded) {
    return <Text>loading...</Text>;
  } else {
    return (
      <Provider store={store}>
        {isConnected ? <Main /> : <ErrorScreen check={checkConnection} />}
      </Provider>
    );
  }
}

const ErrorScreen = ({check}: any) => {
  const createTwoButtonAlert = () =>
    Alert.alert('Alert!', 'Server is not Connected', [
      {
        text: 'Reload',
        onPress: () => check(),
        style: 'cancel',
      },
      { text: 'OK' },
    ]
  );

  useEffect(() => createTwoButtonAlert());

  return (
    <View style={styles.errorContainer}>
      <Text style={styles.txt}>...zzz </Text>
      <Text style={styles.txt}>zz... </Text>
      <MaterialCommunityIcons name="coffin" size={54} color="white" />
      <TouchableOpacity onPress={check}>
          <Text style={styles.button}>Reload</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: '#000',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  txt:{
    color: '#fff',
    paddingLeft: 50
  },
  button: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Courier',
    paddingTop: 30,
  }
});
