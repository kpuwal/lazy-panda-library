import React, {useState, useEffect} from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text } from "react-native";
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import DropDownMenu from './DropDownMenu';
import { RootState, useAppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
import {updateBook} from '../redux/slices/bookSlice';

type BookFormTypes = {
  children: React.ReactNode,
  // pickerData: {
  //   genre: {label: string, value: string}[],
  //   series: {label: string, value: string}[],
  //   world: {label: string, value: string}[],
  //   readBy: {label: string, value: string}[],
  // },
  // handleSave: any,
}

const BookForm = ({children}: BookFormTypes) => {
  const book = useSelector((state: RootState) => state.book);
  const pickers = useSelector((state: RootState) => state.pickers);
  
  const dispatch = useAppDispatch();
  const numLines = 2;

  // const [genre, setGenre] = useState('');
  // const [series, setSeries] = useState('');
  // const [world, setWorld] = useState('');
  // const [readBy, setReadBy] = useState('');

  // const [bookInfo, setBookInfo] = useState({
  //   title: book.title + '. ' + book.subtitle,
  //   author: book.authors.join(', '),
  //   language: book.language,
  //   publishedDate: book.publishedDate,
  //   pageCount: book.pageCount,
  // })

  // useEffect(() => handleSaveData(), [genre, series, world, readBy])

  // const handleSaveData = () => {
  //   handleSave(bookInfo.title, bookInfo.author, bookInfo.language, bookInfo.publishedDate, bookInfo.pageCount, genre, series, world, readBy)
  // }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>TITLE:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(el) => dispatch(updateBook({title: el}))}
          defaultValue={book.title}
          value={book.title}
          editable
          multiline
          numberOfLines={2}
        />
        <PandaEditIcon />
      </View>
      <Text style={styles.label}>AUTHOR</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(el) => dispatch(updateBook({author: el}))}
          defaultValue={book.author}
          value={book.author}
          editable
          multiline
          numberOfLines={numLines}
        />
        <PandaEditIcon />
      </View>
      <Text style={styles.label}>PAGE COUNT:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(el) => dispatch(updateBook({pageCount: el}))}
          defaultValue={book.pageCount.toString(10)}
          value={book.pageCount.toString(10)}
          editable
          multiline
          numberOfLines={numLines}
          keyboardType="numeric"
        />
        <PandaEditIcon />
      </View>
      <Text style={styles.label}>PUBLISHED DATE:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(el) => dispatch(updateBook({publishedDate: el}))}
          defaultValue={book.publishedDate}
          value={book.publishedDate}
          editable
          multiline
          numberOfLines={numLines}
        />
        <PandaEditIcon />
      </View>
      <Text style={styles.label}>LANGUAGE:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(el) => dispatch(updateBook({language: el}))}
          defaultValue={book.language}
          value={book.language}
          editable
          multiline
          numberOfLines={numLines}
        />
        <PandaEditIcon />
      </View>
      <View style={styles.pickerContainer}>
        <DropDownMenu
          placeholder='select  GENRE'
          data={pickers.genre}
          selected={(el: string) => dispatch(updateBook({genre: el}))}
        />
      </View>
      <View style={styles.pickerContainer}>
        <DropDownMenu
          placeholder='select  SERIES'
          data={pickers.series}
          selected={(el: string) => dispatch(updateBook({series: el}))}
        />
      </View>
      <View style={styles.pickerContainer}>
        <DropDownMenu
          placeholder='select  WORLD'
          data={pickers.world}
          selected={(el: string) => dispatch(updateBook({world: el}))}
        />
      </View>
      <View style={styles.pickerContainer}>
        <DropDownMenu
          placeholder='select  READ BY'
          data={pickers.readBy}
          selected={(el: string) => dispatch(updateBook({readBy: el}))}
        />
      </View>
      {children}
    </SafeAreaView>
  );
};

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

const styles = StyleSheet.create({
  container: {
    width: '95%',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
  },
  label: {
    color: '#9d9d9d',
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 14,
    // paddingTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    // justifyContent: 'center',
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
    // fontFamily: 'Verdana',
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
  pickerContainer: {
    height: '8%'
  }
});

export default BookForm;