import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type NumberCardTypes = {
  language: string,
  pageCount: string | number,
  publishedDate: string,
}
const NumbersCard = ({language, pageCount, publishedDate}: NumberCardTypes) => {
  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <Text style={styles.header}>Language</Text>
        <Text style={styles.value}>{language}</Text>
      </View>
      <View style={styles.box2}>
        <Text style={styles.header}>Page Count</Text>
        <Text style={styles.value}>{pageCount}</Text>
      </View>
      <View style={styles.box3}>
        <Text style={styles.header}>Published Date</Text>
        <Text style={styles.value}>{publishedDate}</Text>
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
    paddingBottom: 10,
    color: '#808080',
    fontFamily: 'Courier',
  },
  value: {
    fontSize: 20,
  },
  box1:{},
  box2: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#808080',
    paddingHorizontal: 20,
  },
  box3: {},
})
