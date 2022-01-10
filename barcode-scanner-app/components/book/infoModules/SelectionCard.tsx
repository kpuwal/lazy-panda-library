import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

type SelectionCardTypes = {
  data: {label: string, value: string}[],
  active: string,
  select: any,
  title: string,
}

const SelectionCard = ({data, select, active, title}: SelectionCardTypes) => {
  return (
    <>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.container}>
        {data.map((item, idx) => <Item key={idx} el={item.value} {...{select, active}} />)}
      </View>
    </>
  )
}

type ItemTypes = {
  el: string,
  select: any,
  active: string,
}

const Item = ({el, select, active}: ItemTypes) => {
  return (
    <TouchableOpacity
      style={[styles.itemContainer, el === active ? styles.active : styles.reg]}
      onPress={() => select(el)}
    >
      <Text style={el === active ? styles.active : styles.reg}>{el}</Text>
    </TouchableOpacity>
  )
}

export default SelectionCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15
  },
  itemContainer: {
    borderWidth: .5,
    borderColor: '#f9f9f9',
    borderRadius: 5,
    padding: 5,
    margin: 3
  },
  active: {
    color: '#FFFFFF',
    backgroundColor: '#000000',
    fontFamily: 'Courier',
  },
  reg: {
    color: '#000000',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Courier',
    fontSize: 12
  },
  title: {
    color: '#000000',
    padding: 15,
    fontFamily: 'Courier',
  }
})
