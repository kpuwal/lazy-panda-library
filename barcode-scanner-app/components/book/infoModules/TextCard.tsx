import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';

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
      {
      showIcon && (
        <View style={styles.icon}>
          <Entypo name="edit" size={14} color="#9d9d9d" />
        </View>
        )
      }
      <TextInput
        style={[styles.input, {fontSize: size}]}
        onChangeText={editItem}
        defaultValue={item}
        editable
        multiline
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
    borderBottomColor: '#9d9d9d',
    marginBottom: '3%'
  },
  input: {
    lineHeight: 40,
    fontSize: 17,
    textAlign: 'center',
    fontFamily: 'Courier',
    fontWeight: 'bold',
    width: '100%'
  },
  icon: {
    position: 'absolute',
    right: 10,
    bottom: 3
  }
});
