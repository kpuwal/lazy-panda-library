import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from "react-redux";

import { RootState, useAppDispatch } from '../../redux/store';
import { setFlashMode } from '../../redux/slices/appSlice';

const Flash = () => {
  const color = "#161616";
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
            <MaterialCommunityIcons
              name="lightbulb-on"
              size={30}
              {...{color}}
            />
          ) : (
            <MaterialCommunityIcons
              name="lightbulb"
              size={30}
              {...{color}}
            />
          )
        }
      </TouchableWithoutFeedback>
  )
}

export default Flash;
