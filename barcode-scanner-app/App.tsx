import React, {useState, useEffect} from 'react';
import { Provider } from "react-redux";
import { Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { store } from './redux/store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { APP_ENV_IP, APP_ENV_ADDRESS } from '@env';

const isLocal = true;

import Main from './components/Main';

// import { useFonts, Roboto_400Regular } from "@expo-google-fonts/roboto";
import { 
  useFonts,
  CourierPrime_400Regular,
  CourierPrime_400Regular_Italic,
  CourierPrime_700Bold,
  CourierPrime_700Bold_Italic 
} from '@expo-google-fonts/courier-prime'

export default function App() {
  const [isConnected, setConnected] = useState(false);
  let [fontsLoaded] = useFonts({ CourierPrime_400Regular });

  const checkConnection = async () => {
    try {
      await fetch(`${isLocal ? APP_ENV_IP : APP_ENV_ADDRESS}/`);
      setConnected(true);
    } catch (err) {
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
      <TouchableOpacity style={styles.button} onPress={check}>
          <Text style={styles.buttonTxt}>Reload App</Text>
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
    paddingLeft: 50,
  },
  button: {
    borderColor: '#f1f1f1',
    borderStyle: 'dashed',
    borderWidth: .5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 30,

  },
  buttonTxt: {
    color: '#fff',
    fontFamily: 'Courier Prime',
    fontSize: 20,
  }
});
