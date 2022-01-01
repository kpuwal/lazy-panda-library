import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

type DropDownMenuTypes = {
  data: {value: string}[],
  placeholder: string,
  selected: any,
}

const DropDownMenu = ({data, placeholder, selected}: DropDownMenuTypes) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  return (
    <DropDownPicker
      style={styles.container}
      open={open}
      items={data}
      setOpen={setOpen}
      value={value}
      setValue={setValue}
      placeholderStyle={styles.placeholder}
      closeAfterSelecting={true}
      dropDownDirection="TOP"
      onChangeValue={(value) => {
        selected(value);
      }}
      {...{placeholder}}
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
