import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const bg = 'rgba(0, 0, 0, .15)';

type ScannScreenTypes = {
  children: React.ReactNode,
}

const ScanScreen = ({children}: ScannScreenTypes) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.top}><Text></Text></View>
        <View style={styles.middle}>
          <View style={styles.middleLeft} />
          <View style={styles.middleMiddle} />
          <View style={styles.middleRight} />
        </View>
        <View style={styles.bottom} />
      </View>
      <View style={styles.camera}>
        {children}
      </View>
    </>
  )
}

export default ScanScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'stretch',
    position: 'relative',
  },
  camera: {
    position: 'absolute',
    alignItems: 'center',
    width: '100%'
  },
  top: {
    height: '20%',
    backgroundColor: bg,
    justifyContent: 'flex-end',
    paddingLeft: 20,

  },
  middle: {
    height: '40%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  middleLeft: {
    width: '5%',
    backgroundColor: bg,
  },
  middleMiddle: {
    alignSelf: 'center',
    width: '90%',
    height: '100%',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 5,
    borderStyle: 'dashed'
  },
  middleRight: {
    width: '5%',
    backgroundColor: bg,
  },
  bottom: {
    height: '40%',
    backgroundColor: bg,
  },
})
