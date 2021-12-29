import React, { useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

type DropDownMenuTypes = {
  data: {value: string}[],
  placeholder: string,
  value: string,
  setValue: any,
}

const DropDownMenu = ({data, placeholder, value, setValue}: DropDownMenuTypes) => {
  const [open, setOpen] = useState(false);
  
  return (
    <DropDownPicker
      style={styles.container}
      open={open}
      items={data}
      setOpen={setOpen}
      placeholderStyle={styles.placeholder}
      closeAfterSelecting={true}
      dropDownDirection="TOP"
      {...{placeholder, value, setValue}}
    />
  )
}

export default DropDownMenu;

const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
    backgroundColor: '#f1f1f1',
  },
  placeholder: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#9d9d9d'
  }
})
