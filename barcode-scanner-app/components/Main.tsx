import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, Keyboard, Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from '../redux/store';
import { fetchBook, saveBook, cleanBook } from '../redux/slices/bookSlice';
import { fetchPicker } from '../redux/slices/pickerSlice';
import Dots from './scanner/Dots';
import BookInfo from './book/BookInfo';
import ScannerCamera from './scanner/ScannerCamera';
import ScannerMain from './scanner/ScannerMain';

import { Camera } from 'expo-camera';

import BookForm from './BookForm';
import ScanningGIF from './scanner/ScanningGIF';

type BarCodeScannerTypes = {
  type: string,
  data: string,
}

export default function Main() {
  const [flash, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [hasPermission, setHasPermission] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [scanned, setScanned] = useState(false);

  const book = useSelector((state: RootState) => state.book);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      dispatch(fetchPicker());
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: BarCodeScannerTypes) => {
    dispatch(cleanBook(data));
    dispatch(fetchBook(data));
    setDisabled(false);
    setScanned(true);
    setFlashMode(Camera.Constants.FlashMode.off)
  };

  const saveDataToDB = async () => {
    dispatch(saveBook(book));
    setDisabled(true);
  }

  const handleFlash = () => {
    setFlashMode(flash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off)
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <>
      <ScannerCamera />
      <ScannerMain />
      {/* <View style={styles.container}> */}
        {/* <Camera
          flashMode={flash}
          // ref={r => {
          //   camera = r;
          // }}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{flex: 1}}
        /> */}
        {/* <ScanScreen> */}
        {/* {
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
        <View style={styles.bottomMenu}>
          {scanned ? <View /> : <Text style={styles.infoTxt}>Scanning <Dots /></Text>}
          {!scanned || book.isLoaded ? <View /> : <Text style={styles.infoTxt}>Loading <Dots /> </Text>}
          {!scanned && <BottomMenu flashMode={handleFlash} isOn={flash === Camera.Constants.FlashMode.off} />
          }
        </View>
        </ScanScreen> */}
      {/* </View> */}
      </>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
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
    borderRadius: 15,
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
    fontSize: 22,
    paddingBottom: 20,
    top: '-80%',
  },
  bottomMenu: {
    // justifyContent: 'flex-start',
    alignItems: 'center',
    // height: '25%',
    width: '90%',
    paddingVertical: 0,
  }
});
