import React from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
const windowHeight = Dimensions.get('window').height;

const BookInfo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}></View>
      <Text></Text>
    </View>
  )
}

export default BookInfo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: windowHeight,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'flex-end'
  },
  innerContainer: {
    height: windowHeight * .75,
    borderColor: 'black',
    borderTopWidth: 2,
    borderLeftWidth: 2,

    borderTopLeftRadius: 20
  }
})
