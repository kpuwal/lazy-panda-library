import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

type SelectionCardTypes = {
  data: {label: string, value: string}[],
  active: string,
  select: any,
  title: string,
  icon?: any,
}

type ItemTypes = {
  el: string,
  select: any,
  active: string,
}

const SelectionCard = ({data, select, active, title, icon}: SelectionCardTypes) => {
  return (
    <>
      <View style={styles.titleContainer}>
        <View>{icon}</View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.container}>
        {data.map((item, idx) => <Item key={idx} el={item.value} {...{select, active}} />)}
      </View>
    </>
  )
}

const Item = ({el, select, active}: ItemTypes) => {
  const handleSelect = (item: string) => {
    active === item ? select('') : select(item);
  }

  return (
    <TouchableOpacity
      style={[styles.itemContainer, el === active ? styles.active : styles.reg]}
      onPress={() => handleSelect(el)}
    >
      <Text style={el === active ? styles.active : styles.reg}>{el}</Text>
    </TouchableOpacity>
  )
}

export default SelectionCard;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
  },
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
    fontSize: 18
  },
  reg: {
    color: '#000000',
    backgroundColor: '#FFFFFF',
    fontFamily: 'Courier',
    fontSize: 18
  },
  title: {
    color: '#000000',
    padding: 15,
    fontFamily: 'Courier',
    fontSize: 18,
  }
})
