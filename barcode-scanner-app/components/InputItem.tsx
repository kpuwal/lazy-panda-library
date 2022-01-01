import React from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

type InputItemType = {
  label: string,
  isNumeric: boolean,
  item: string,
  editItem: any,
}

const InputItem
 = ({label, item, isNumeric, editItem}: InputItemType) => {
   const numLines = 2;
  return (
    <>
      <Text style={styles.label}>{label}:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={editItem}
          defaultValue={item}
          editable
          multiline
          numberOfLines={numLines}
          value={item}
          keyboardType={isNumeric ? 'numeric' : 'default'}
        />
        <PandaEditIcon />
      </View>
    </>
  )
}

const PandaEditIcon = () => {
  const color = '#9d9d9d';
  return (
    <View style={styles.iconStyle}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="panda" size={18} {...{color}} />
        <Entypo style={styles.pen} name="edit" size={14} {...{color}} />
      </View>
      <Text style={styles.editTxt}>edit</Text>
    </View>
  )
}

export default InputItem
;

const styles = StyleSheet.create({
  label: {
    color: '#9d9d9d',
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: .3,
    borderBottomColor: '#9d9d9d',
    marginLeft: 5,
    marginRight: 5,
  },
  input: {
    flex: 1,
    margin: 5,
    paddingLeft: 5,
    fontSize: 17,
  },
  iconStyle: {
    flexDirection: 'column',
    paddingLeft: 2,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  editTxt: {
    fontSize: 8,
    color: '#9d9d9d'
  },
  pen: {
    top: 8,
    left: -5,
  },
})
