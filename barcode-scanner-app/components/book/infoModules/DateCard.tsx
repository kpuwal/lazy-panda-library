import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState, useEffect } from 'react';

type DateCardTypes = {
  item: string,
  editItem: any,
}

const DateCard = ({item, editItem}: DateCardTypes) => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={day}
        onChangeText={setDay}
        editable
        selectionColor='pink'
        keyboardType='numeric'
      />
      <Text>/</Text>
      <TextInput
        style={styles.input}
        value={day}
        onChangeText={setDay}
        editable
        selectionColor='pink'
        keyboardType='numeric'
      />
      <Text>/</Text>
      <TextInput
        style={styles.input}
        value={day}
        onChangeText={setDay}
        editable
        selectionColor='pink'
        keyboardType='numeric'
      />
    </View>
  );
};

export default DateCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  input: {
    lineHeight: 40,
    fontSize: 17,
    textAlign: 'center',
    fontFamily: 'Courier Prime Bold',
    fontWeight: 'bold',
    width: '100%',
  },
});
