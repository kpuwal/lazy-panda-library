import React, {useEffect, useMemo} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from "react-redux";

import { isScanned } from '../../redux/slices/appSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import ScanningGIF from './ScanningGIF';
import Dots from './Dots';
import Flash from './Flash';
import { updateBook } from '../../redux/slices/bookSlice';

const ScannerMain = () => {
  const scanned = useSelector((state: RootState) => state.app.scanned);
  const bookIsLoaded = useSelector((state: RootState) => state.book.isLoaded);
  const bookError = useSelector((state: RootState) => state.book.bookError);
  const dispatch = useAppDispatch();

  console.log('ScannerMain')

  useEffect(() => {
    if (bookError !== '') {
      alert(bookError);
      dispatch(isScanned(false));
    }
  },[bookError])


  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        {!scanned && <Text style={styles.infoTxt}>Scanning</Text>}
        {scanned || bookIsLoaded ? <Text style={styles.infoTxt}>Loading</Text> : <View />}
        <Dots />
        <ScanningGIF />
      </View>
      <Flash />
    </View>
  )
}

export default React.memo(ScannerMain);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '25%',
    textAlign: 'justify',
    bottom: '-5%',
  },
  infoTxt: {
    color: '#FFFFFF',
    fontSize: 25,
    bottom: '-2%',
    fontFamily: 'Courier Prime',
  }
})
