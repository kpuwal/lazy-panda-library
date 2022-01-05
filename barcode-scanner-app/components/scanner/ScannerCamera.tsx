import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from "react-redux";
import { Camera } from 'expo-camera';

import { RootState, useAppDispatch } from '../../redux/store';
import { fetchPicker } from '../../redux/slices/pickerSlice';
import { fetchBook, cleanBook } from '../../redux/slices/bookSlice';
import { isDisabled, isScanned, setFlashMode } from '../../redux/slices/appSlice';
import ScannerBgScreen from './ScannerBgScreen';

type BarCodeScannerTypes = {
  type: string,
  data: string,
}

const ScannerCamera = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const scanned = useSelector((state: RootState) => state.app.scanned);
  const flash = useSelector((state: RootState) => state.app.flashMode);
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
      dispatch(fetchPicker());
    })();
  }, []);

  const handleBarCodeScanned = ({ data }: BarCodeScannerTypes) => {
    dispatch(cleanBook(data));
    dispatch(fetchBook(data));
    dispatch(isDisabled(false));
    dispatch(isScanned(true));
    dispatch(setFlashMode("off"));
  }

  if (hasPermission === null) { return <View /> };
  if (hasPermission === false) { return <Text>No access to camera</Text> };

  return (
    <Camera
      style={styles.camera}
      flashMode={flash === "off" ? Camera.Constants.FlashMode.off : Camera.Constants.FlashMode.torch}
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
    >
     <ScannerBgScreen />
    </Camera>
  )
}

export default ScannerCamera;

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
});
