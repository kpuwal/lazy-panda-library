import React from 'react';
import { TouchableWithoutFeedback, StyleSheet, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from "react-redux";

import { RootState, useAppDispatch } from '../../redux/store';
import { setFlashMode } from '../../redux/slices/appSlice';

const Flash = () => {
  const color = "#9a9a9a";
  const flash = useSelector((state: RootState) => state.app.flashMode);
  const dispatch = useAppDispatch();

  return (
      <TouchableWithoutFeedback
        onPress={() => {
          flash === 'off'
          ? dispatch(setFlashMode('on'))
          : dispatch(setFlashMode('off'))
        }}
      >
        {
          flash === 'off' ? (
            <View style={styles.container}>
              <MaterialCommunityIcons
                name="lightbulb-off"
                size={30}
                {...{color}}
              />
              <Text style={styles.iconText}>Light <Text style={styles.txtSpan}> OFF</Text>
              </Text>
            </View>
          ) : (
            <View style={styles.container}>
              <MaterialCommunityIcons
                name="lightbulb-on"
                size={30}
                {...{color}}
              />
              <Text style={styles.iconText}>Light ON</Text>
            </View>
          )
        }
      </TouchableWithoutFeedback>
  )
}

export default Flash;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: '10%',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingBottom: 15,
    paddingHorizontal: 25,
  },
  iconText: {
    color: '#9a9a9a',
    fontSize: 10,
    paddingVertical: 5
  },
  txtSpan: {
    fontWeight: 'bold',
    fontSize: 10,
    paddingVertical: 5
  },
  infoContainer: {
    width: 10
  }
})
