import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, Keyboard, Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { BarCodeScanner, PermissionResponse } from 'expo-barcode-scanner';
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from '../redux/store';
import { fetchBook, saveBook, cleanBook } from '../redux/slices/bookSlice';
import { fetchPicker } from '../redux/slices/pickerSlice';

import BookForm from './BookForm';
import ScanningGIF from './ScanningGIF';

type BarCodeScannerTypes = {
  type: string,
  data: string,
}

export default function Main() {  
  const [hasPermission, setHasPermission] = useState(null);
  const [isDisabled, setDisabled] = useState(false);
  const [scanned, setScanned] = useState(false);

  const book = useSelector((state: RootState) => state.book);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      dispatch(fetchPicker());
    })();
  }, []);

  const handleBarCodeScanned = ({ data }: BarCodeScannerTypes) => {
    dispatch(cleanBook(data));
    dispatch(fetchBook(data));
    setDisabled(false);
    setScanned(true);
  };

  const saveDataToDB = async () => {
    dispatch(saveBook(book));
    setDisabled(true);
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {
          scanned && book.isLoaded ? 
          (
            <BookForm>
              <View style={styles.buttonSet}>
              <TouchableHighlight
                style={styles.button}
                onPress={() => setScanned(false)}
              >
                <Text style={styles.buttonLabel}>Scan Again</Text>
              </TouchableHighlight>
              <TouchableHighlight
                disabled={isDisabled}
                style={isDisabled ? [styles.button, styles.disabledButton] : styles.button}
                onPress={() => saveDataToDB()}
              >
                <Text style={styles.buttonLabel}>Save to DB</Text>
              </TouchableHighlight>
              </View>
            </BookForm>) :
            <ScanningGIF />
        }
        {scanned ? <View /> : <Text style={styles.infoTxt}>Scanning ...</Text>}
        {!scanned || book.isLoaded ? <View /> : <Text style={styles.infoTxt}>Loading ... </Text>}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSet: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }, 
  button: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#0080FF'
  },
  buttonLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#9d9d9d',
  },
  infoTxt: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 20,
  }
});
