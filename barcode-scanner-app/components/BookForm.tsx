import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { RootState, useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import { updateBook } from '../redux/slices/bookSlice';
import InputItem from './InputItem';
import DropDownMenu from './DropDownMenu';


type BookFormTypes = { children: React.ReactNode };

const BookForm = ({children}: BookFormTypes) => {
  const book = useSelector((state: RootState) => state.book);
  const pickers = useSelector((state: RootState) => state.pickers);
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView style={styles.container}>
      <InputItem
        label='TITLE'
        item={book.title}
        isNumeric={false}
        editItem={(el: string) => dispatch(updateBook({title: el}))}
      />
      <InputItem
        label='Author'
        item={book.author}
        isNumeric={false}
        editItem={(el: string) => dispatch(updateBook({author: el}))}
      />
      <InputItem
        label='PAGE COUNT'
        item={book.pageCount.toString(10)}
        isNumeric={true}
        editItem={(el: string) => dispatch(updateBook({pageCount: el}))}
      />
      <InputItem
        label='PUBLISHED DATE'
        item={book.publishedDate}
        isNumeric={false}
        editItem={(el: string) => dispatch(updateBook({publishedDate: el}))}
      />
      <InputItem
        label='LANGUAGE'
        item={book.language}
        isNumeric={false}
        editItem={(el: string) => dispatch(updateBook({language: el}))}
      />
      <DropDownMenu
        placeholder='select  GENRE'
        data={pickers.genre}
        selected={(el: string) => dispatch(updateBook({genre: el}))}
      />
      <DropDownMenu
        placeholder='select  SERIES'
        data={pickers.series}
        selected={(el: string) => dispatch(updateBook({series: el}))}
      />
      <DropDownMenu
        placeholder='select  WORLD'
        data={pickers.world}
        selected={(el: string) => dispatch(updateBook({world: el}))}
      />
      <DropDownMenu
        placeholder='select  READ BY'
        data={pickers.readBy}
        selected={(el: string) => dispatch(updateBook({readBy: el}))}
      />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    // height: '100%',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
  },
});

export default BookForm;