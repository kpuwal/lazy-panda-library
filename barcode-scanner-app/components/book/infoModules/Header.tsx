import React from 'react';
import { StyleSheet, Pressable, View, Text, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type HeaderTypes = {
  handleClose: any,
  isDisabled: boolean,
}

const Header = ({handleClose, isDisabled}: HeaderTypes) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerIcons}>
          <Image 
            source={require('./../../../assets/book.png')}  
            style={{ width: 30, height: 30 }}
          />
          <Text style={styles.infoLabel}>Book Info:</Text>
        </View>
        <View>
          <Pressable onPress={handleClose}>
            <MaterialCommunityIcons name="close" size={24} color="black" />
          </Pressable>
        </View>
        
      </View>
      <View style={styles.alertContainer}>
        {isDisabled && (
          <View style={styles.alertRow}>
            <MaterialCommunityIcons name="alert-octagon" size={14} color="red" />
            <Text style={styles.alert}>The Book Has Been Successfully Saved!</Text>
          </View>)}
      </View>
    </View>
  )
}

export default Header;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
    marginTop: 10,
  },
  alertContainer: {
    height: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  infoLabel: {
    left: 8,
    fontSize: 28,
    fontFamily: 'Courier Prime',
  },
  alertRow: {
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center',
    paddingVertical: 10,
  },
  alert: {
    color: 'red',
    fontFamily: 'Courier Prime',
    fontSize: 12,
    paddingLeft: 5,
  }
})
