import React from 'react'
import { StyleSheet, View, ScrollView, Modal } from 'react-native';
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from '../../redux/store';
import { updateBook, saveBook } from '../../redux/slices/bookSlice';
import { isScanned, isDisabled } from '../../redux/slices/appSlice';
import { MaterialCommunityIcons, FontAwesome5, Fontisto } from '@expo/vector-icons';

import Header from './infoModules/Header';
import TextCard from './infoModules/TextCard';
import NumbersCard from './infoModules/NumbersCard';
import BottomMenu from './infoModules/BottomMenu';
import SelectionCard from './infoModules/SelectionCard';

const BookInfo = () => {
  const book = useSelector((state: RootState) => state.book);
  const picker = useSelector((state: RootState) => state.pickers);
  const app = useSelector((state: RootState) => state.app);

  const dispatch = useAppDispatch();

  const genreIcon = <MaterialCommunityIcons name="bookshelf" size={19} color="black" />
  const seriesIcon = <FontAwesome5 name="dragon" size={14} color="black" />
  const worldIcon = <Fontisto name="map" size={14} color="black" />
  const readByIcon = <FontAwesome5 name="user-friends" size={14} color="black" />

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
      <View style={styles.container}>
        <Header 
          handleClose={() => handleScanAgain()}
          isDisabled={app.disabled}
        />
        <ScrollView>
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
          <NumbersCard
            language={book.language}
            pageCount={book.pageCount}
            publishedDate={book.publishedDate}
          />
          <SelectionCard
            title={"Genre:"}
            icon={genreIcon}
            data={picker.genre}
            active={book.genre}
            select={(el: string) => dispatch(updateBook({genre: el}))}
          />
          <SelectionCard
            title={"Series:"}
            icon={seriesIcon}
            data={picker.series}
            active={book.series}
            select={(el: string) => dispatch(updateBook({series: el}))}
          />
          <SelectionCard
            title={"World:"}
            icon={worldIcon}
            data={picker.world}
            active={book.world}
            select={(el: string) => dispatch(updateBook({world: el}))}
          />
          <SelectionCard
            title={"Read By:"}
            icon={readByIcon}
            data={picker.readBy}
            active={book.readBy}
            select={(el: string) => dispatch(updateBook({readBy: el}))}
          />
          <View style={styles.dummy}/>
        </ScrollView>
        <BottomMenu
          disabled={app.disabled}
          handleScan={() => handleScanAgain()}
          handleSave={() => handleSaveBook()}
        />
      </View>
    </Modal>
  )
}

export default BookInfo

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '10%',
    // padding: 15,
    backgroundColor: '#f1f1f1',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  dummy: {
    width: '100%',
    height: '20%',
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
