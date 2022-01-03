import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScanningGIF from './ScanningGIF';
import Flash from './Flash';

const ScannerMain = () => {
  return (
    <View style={styles.container}>
      <ScanningGIF />
      <Flash />
    </View>
  )
}

export default ScannerMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
