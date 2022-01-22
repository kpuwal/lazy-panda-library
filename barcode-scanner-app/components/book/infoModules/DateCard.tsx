import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useAppDispatch } from '../../../redux/store';
import { updateBook } from '../../../redux/slices/bookSlice';


type DateCardTypes = {
  type: string,
}

const DateCard = ({type}: DateCardTypes) => {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const dispatch = useAppDispatch();

  useEffect(() => {
    let date = '';
    if (day === '' && month !== '' && year !== '') {
      date = month + '/' + year;
    } else if (day === '' && month === '' && year === '') {
      date = '';
    } else {
      date = day + '/' + month + '/' + year;
    }
    dispatch(updateBook({[type]: date}));
  }, [day, month, year]);

  const handleDays = () => {
    // console.log('finished')
  }

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.txt}>day</Text>
        <Text style={styles.txt}>month</Text>
        <Text style={styles.txt}>year</Text>
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={day}
          onChangeText={setDay}
          editable
          selectionColor='pink'
          keyboardType='numeric'
          onEndEditing={handleDays}
        />
        <Text style={styles.slash}>/</Text>
        <TextInput
          style={styles.input}
          value={month}
          onChangeText={setMonth}
          editable
          selectionColor='pink'
          keyboardType='numeric'
        />
        <Text style={styles.slash}>/</Text>
        <TextInput
          style={styles.input}
          value={year}
          onChangeText={setYear}
          editable
          selectionColor='pink'
          keyboardType='numeric'
        />
      </View>
    </>
  );
};

export default DateCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '3%',
    marginHorizontal: 15,
  },
  input: {
    lineHeight: 30,
    fontSize: 27,
    textAlign: 'center',
    fontFamily: 'Courier Prime Bold',
    width: '20%',
    height: 50,
    backgroundColor: '#f8f8f8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txt: {
    paddingHorizontal: 18,
    fontFamily: 'Courier Prime',
  },
  slash: {
    fontSize: 27,
    fontFamily: 'Courier Prime',
  }
});
