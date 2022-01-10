import React from 'react';
import { StyleSheet, Pressable, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type HeaderTypes = {
  handleClose: any,
  isDisabled: boolean,
}

const Header = ({handleClose, isDisabled}: HeaderTypes) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerIcons}>
        <MaterialCommunityIcons name="book-open-page-variant" size={30} color="black" />
        <Text style={styles.infoLabel}>Book Info:</Text>
      </View>
      <View>
        <Pressable onPress={handleClose}>
          <MaterialCommunityIcons name="close" size={24} color="black" />
        </Pressable>
      </View>
      <View>
        {isDisabled && <Text style={styles.alert}>The Book Has Been Saved To The Database</Text>}
      </View>
    </View>
  )
}

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    marginTop: 10,
    marginHorizontal: 15,
  },
  headerIcons: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'flex-end',
  },
  infoLabel: {
    left: 8,
    fontSize: 28,
    fontFamily: 'Courier',
  },
  alert: {
    color: 'red',
    fontFamily: 'Courier',
    fontSize: 12,
  }
})
