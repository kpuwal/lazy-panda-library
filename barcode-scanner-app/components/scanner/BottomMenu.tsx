import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

type BottomMenuTypes = {
  flashMode: Function,
  isOn: boolean,
}

const BottomMenu = ({flashMode, isOn}: BottomMenuTypes) => {
  const bulb = "#161616";
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => flashMode()}
      >
        {
          isOn? (
            <MaterialCommunityIcons style={styles.icon} name="lightbulb-on" size={30} color={bulb} />
          ) : (
            <MaterialCommunityIcons style={[styles.icon, {borderWidth: 0}]} name="lightbulb" size={30} color={bulb} />
          )
        }
      </TouchableWithoutFeedback>
    </View>
  )
}

export default BottomMenu;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // height: '50%',
    alignItems: 'flex-end',
    // paddingHorizontal: 40,
    // borderWidth: .8,
    // borderColor: 'black',
    // borderRadius: 20,
    // borderStyle: 'dashed'
  },
  icon: {
    // padding: 2,
  //  backgroundColor: '#3d3d3d',
   
  }
})
