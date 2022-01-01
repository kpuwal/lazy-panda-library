import React from 'react';
import { StyleSheet, TextInput, Text, View } from 'react-native';
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { RootState, useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";


type InputRowType = {
  label: string,
  type: string,
}

const InputRow = ({label, type}: InputRowType) => {
  const book = useSelector((state: RootState) => state.book);

  return (
    <>
      <Text style={styles.label}>{label}:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(el) => updateBook({...book, [type]: el})}
          defaultValue={bookInfo.pageCount.toString(10)}
          value={bookInfo.pageCount.toString(10)}
          editable
          multiline
          numberOfLines={numLines}
          keyboardType="numeric"
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

export default InputRow;

const styles = StyleSheet.create({})
