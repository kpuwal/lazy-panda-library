import React from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableHighlight, Modal, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from '../../redux/store';
import { updateBook, saveBook } from '../../redux/slices/bookSlice';
import { isScanned, isDisabled } from '../../redux/slices/appSlice';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import DropDownMenu from '../DropDownMenu';
import Header from './infoModules/Header';
import TextCard from './infoModules/TextCard';
import NumberCard from './infoModules/NumberCard';

const windowHeight = Dimensions.get('window').height;

const BookInfo = () => {
  const book = useSelector((state: RootState) => state.book);
  const pickers = useSelector((state: RootState) => state.pickers);
  const app = useSelector((state: RootState) => state.app);

  const dispatch = useAppDispatch();

  const handleSaveBook = () => {
    dispatch(saveBook(book));
    dispatch(isDisabled(true));
  }

  const handleScanAgain = () => {
    dispatch(isScanned(false));
    dispatch(updateBook({isLoaded: false}));
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={book.isLoaded}
    >
      <ScrollView style={styles.container}>
        <Header handleClose={() => handleScanAgain()} />
          <TextCard
            item={book.title}
            size={28}
            isNumeric={false}
            editItem={(el: string) => dispatch(updateBook({title: el}))}
            showIcon={true}
          />
          <TextCard
            item={book.author}
            size={20}
            isNumeric={false}
            editItem={(el: string) => dispatch(updateBook({author: el}))}
            showIcon={true}
          />
          <NumberCard
            language={book.language}
            pageCount={book.pageCount}
            publishedDate={book.publishedDate}
          />
      </ScrollView>
      <View style={styles.bottomMenu}>
        <View style={styles.buttonSet}>
          <TouchableHighlight
            style={styles.button}
            onPress={() => handleScanAgain()}
          >
            <>
              <Text style={styles.buttonLabel}>Scan</Text>
              <MaterialCommunityIcons name="repeat" size={15} color="black" />
            </>
          </TouchableHighlight>
          <TouchableHighlight
            disabled={app.disabled}
            style={app.disabled ? [styles.button, styles.disabledButton] : styles.button}
            onPress={() => handleSaveBook()}
          >
            <>
              <Text style={styles.buttonLabel}>Save</Text>
              <MaterialCommunityIcons name="database-plus" size={15} color="black" />
            </>
          </TouchableHighlight>
        </View>
      </View>
    </Modal>
  )
}

export default BookInfo

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f1f1',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: '10%',
    padding: 15,
  },
  
  bookCover: {
    width: 100,
    height: 150,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#808080',
    backgroundColor: '#FFFFFF',
  },
  
  author: {
    fontSize: 20,
    fontFamily: 'Courier',
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  bottomMenu: {
    height: '10%',
    backgroundColor: '#000',
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    // top: -80,
  },
  buttonSet: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }, 
  button: {
    width: '35%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: .8,
    borderColor: '#000',
    borderStyle: 'dashed',
    // backgroundColor: '#0080FF'
    backgroundColor: '#fff'

  },
  buttonLabel: {
    color: '#000',
    fontWeight: 'bold',
    paddingHorizontal: 3,
  },
  disabledButton: {
    backgroundColor: '#9d9d9d',
  },
})
