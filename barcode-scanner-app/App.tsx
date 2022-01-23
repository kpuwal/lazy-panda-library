import React, {useState, useEffect, useCallback} from 'react';
import { Provider } from "react-redux";
import { Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { store } from './redux/store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { APP_ENV_IP, APP_ENV_ADDRESS } from '@env';
import { isLocal } from './config';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import Main from './components/Main';

export default function App() {
  const [isConnected, setConnected] = useState(false);
  const [appIsReady, setAppIsReady] = useState(false);
  console.log("====== APP =========")

  const checkConnection = async () => {
    try {
      await fetch(`${isLocal ? APP_ENV_IP : APP_ENV_ADDRESS}/`);
      setConnected(true);
    } catch (err) {
      setConnected(false);
    }
  }

  const loadFonts = async () => {
    await Font.loadAsync({
      'Courier Prime': {
        uri: require('./assets/Courier_Prime/CourierPrime-Regular.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },
      'Courier Prime Bold': {
        uri: require('./assets/Courier_Prime/CourierPrime-Bold.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },
    });
  }

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await loadFonts();
        await checkConnection();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  if (!isConnected) {
    return <ErrorScreen check={checkConnection} />
  }

  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      onLayout={onLayoutRootView}
    >
      <Provider store={store}>
        <Main /> 
      </Provider>
    </View>
  );
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

  useEffect(() => {
    createTwoButtonAlert()
  }, []);

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
    fontSize: 20,
  }
});
