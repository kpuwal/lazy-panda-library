import React, {useState, useEffect} from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text } from "react-native";
import { MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import DropDownMenu from './DropDownMenu';

type BookFormTypes = {
  children: React.ReactNode,
  bookData: {
    title: string,
    subtitle: string,
    authors: string[],
    pageCount: number | string,
    publishedDate: string,
    language: string,
  },
  pickerData: {
    genre: {label: string, value: string}[],
    series: {label: string, value: string}[],
    world: {label: string, value: string}[],
    readBy: {label: string, value: string}[],
  },
  handleSave: any,
}

const BookForm = ({children, bookData, pickerData, handleSave}: BookFormTypes) => {
  const numLines = 2;
  const [genre, setGenre] = useState('');
  const [series, setSeries] = useState('');
  const [world, setWorld] = useState('');
  const [readBy, setReadBy] = useState('');

  const [bookInfo, setBookInfo] = useState({
    title: bookData.title + '. ' + bookData.subtitle,
    author: bookData.authors.join(', '),
    language: bookData.language,
    publishedDate: bookData.publishedDate,
    pageCount: bookData.pageCount,
  })

  useEffect(() => handleSaveData(), [genre, series, world, readBy])

  const handleSaveData = () => {
    handleSave(bookInfo.title, bookInfo.author, bookInfo.language, bookInfo.publishedDate, bookInfo.pageCount, genre, series, world, readBy)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>TITLE:</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(el) => setBookInfo({...bookInfo, title: el})}
          defaultValue={bookInfo.title}
          value={bookInfo.title}
          editable
          multiline
          numberOfLines={2}
        />
        <PandaEditIcon />
      </View>
      <Text style={styles.label}>{bookInfo.author.length === 1 ? 'AUTHOR:' : 'AUTHORS:'}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(el) => setBookInfo({...bookInfo, author: el})}
          defaultValue={bookInfo.author}
          value={bookInfo.author}
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
          onChangeText={(el) => setBookInfo({...bookInfo, pageCount: el})}
          defaultValue={bookInfo.pageCount.toString(10)}
          value={bookInfo.pageCount.toString(10)}
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
          onChangeText={(el) => setBookInfo({...bookInfo, publishedDate: el})}
          defaultValue={bookInfo.publishedDate}
          value={bookInfo.publishedDate}
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
          onChangeText={(el) => setBookInfo({...bookInfo, language: el})}
          defaultValue={bookInfo.language}
          value={bookInfo.language}
          editable
          multiline
          numberOfLines={numLines}
        />
        <PandaEditIcon />
      </View>
      <View style={styles.pickerContainer}>
        <DropDownMenu
          placeholder='select  GENRE'
          data={pickerData.genre}
          value={genre}
          setValue={setGenre}
        />
      </View>
      <View style={styles.pickerContainer}>
        <DropDownMenu
          placeholder='select  SERIES'
          data={pickerData.series}
          value={series}
          setValue={setSeries}
        />
      </View>
      <View style={styles.pickerContainer}>
        <DropDownMenu
          placeholder='select  WORLD'
          data={pickerData.world}
          value={world}
          setValue={setWorld}
        />
      </View>
      <View style={styles.pickerContainer}>
        <DropDownMenu
          placeholder='select  READ BY'
          data={pickerData.readBy}
          value={readBy}
          setValue={setReadBy}
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