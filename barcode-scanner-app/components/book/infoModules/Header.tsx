import React from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type HeaderTypes = {
  handleClose: any,
}

const Header = ({handleClose}: HeaderTypes) => {
  return (
    <View style={styles.header}>
      <View style={styles.headerIcons}>
        <MaterialCommunityIcons name="book-open-page-variant" size={30} color="black" />
        <MaterialCommunityIcons name="plus" size={15} color="black" />
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
    padding: 15
  },
  headerIcons: {
    flexDirection: 'row',
    width: '80%',
    alignItems: 'flex-end',
  },
})
