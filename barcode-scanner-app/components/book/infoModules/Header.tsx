import React from 'react';
import { StyleSheet, Pressable, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type HeaderTypes = {
  handleClose: any,
}

const Header = ({handleClose}: HeaderTypes) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerIcons}>
        {/* <MaterialCommunityIcons name="panda" size={34} color="black" /> */}
        <MaterialCommunityIcons name="book-open-page-variant" size={30} color="black" />
        <Text style={styles.infoLabel}>Book Info:</Text>

        {/* <MaterialCommunityIcons name="plus" size={15} color="black" /> */}
      </View>
      <View>
        <Pressable onPress={handleClose}>
          <MaterialCommunityIcons name="close" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  )
}

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    marginTop: 10,
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
    // fontVariant: 
  }
})
