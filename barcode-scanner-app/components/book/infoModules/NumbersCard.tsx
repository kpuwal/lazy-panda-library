import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TextCard from './TextCard';

type NumberCardTypes = {
  language: string,
  pageCount: string | number,
  publishedDate: string,
  editLanguage: any,
  editPageCount: any,
  editPublishedDate: any,
}
const NumbersCard = ({language, pageCount, publishedDate, editLanguage, editPageCount, editPublishedDate}: NumberCardTypes) => {
  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <Text style={styles.header}>Language</Text>
        <TextCard item={language} size={20} isNumeric={false} editItem={editLanguage} />
      </View>
      <View style={styles.box2}>
        <Text style={styles.header}>Page Count</Text>
        <TextCard item={pageCount.toString()} size={20} isNumeric={true} editItem={editPageCount} />
      </View>
      <View style={styles.box3}>
        <Text style={styles.header}>Published Date</Text>
        <TextCard item={publishedDate} size={20} isNumeric={false} editItem={editPublishedDate} />
      </View>
    </View>
  )
}

export default NumbersCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 12,
    color: '#808080',
    fontFamily: 'Courier Prime',
    // paddingHorizontal: 10
  },
  value: {
    fontSize: 20,
    fontFamily: 'Courier Prime',
  },
  box1:{},
  box2: {
    borderLeftWidth: .5,
    borderRightWidth: .5,
    borderColor: '#808080',
    paddingHorizontal: 18,
  },
  box3: {},
})
