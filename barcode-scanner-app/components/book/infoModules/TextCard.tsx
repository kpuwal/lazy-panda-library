import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';

type TextCardTypes = {
  size: number,
  isNumeric: boolean,
  item: string,
  editItem: any,
  showIcon: boolean,
}

const TextCard = ({size, item, isNumeric, editItem, showIcon}: TextCardTypes) => {
  return (   
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, {fontSize: size}]}
        onChangeText={editItem}
        defaultValue={item}
        editable
        multiline
        selectionColor='pink'
        numberOfLines={4}
        value={item}
        keyboardType={isNumeric ? 'numeric' : 'default'}
      />
    </View>
  )
}

export default TextCard;

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    marginBottom: '3%',
    marginHorizontal: 15,
  },
  input: {
    lineHeight: 40,
    fontSize: 17,
    textAlign: 'center',
    fontFamily: 'Courier',
    fontWeight: 'bold',
    width: '100%',
  },
  icon: {
    // paddingLeft: 15,

    position: 'absolute',
    right: 5,
    bottom: '9%'
  },
  info: {
    // paddingLeft: 20,
    fontSize: 10,
    fontFamily: 'Courier',
    color: '#9d9d9d'
  }
});
