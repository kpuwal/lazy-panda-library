import React from 'react'
import { StyleSheet, View, ScrollView, Modal, Image, Text } from 'react-native';
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from '../../redux/store';
import { updateBook, saveBook } from '../../redux/slices/bookSlice';
import { isScanned, isDisabled } from '../../redux/slices/appSlice';

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

  const genreIcon = <Image 
    source={require('./../../assets/genre.png')}  
    style={{ width: 25, height: 25 }}
  />

  const seriesIcon = <Image 
    source={require('./../../assets/series.png')}  
    style={{ width: 25, height: 25 }}
  />

  const worldIcon = <Image 
    source={require('./../../assets/world.png')}  
    style={{ width: 25, height: 25 }}
  />

  const readByIcon = <Image 
    source={require('./../../assets/reader.png')}  
    style={{ width: 25, height: 25 }}
  />

  const boughtGivenOnIcon = <Image 
    source={require('./../../assets/gift-box.png')}  
    style={{ width: 25, height: 25 }}
  />

  const givenByIcon = <Image 
    source={require('./../../assets/handover.png')}  
    style={{ width: 25, height: 25 }}
  />

  const lastReadIcon = <Image 
    source={require('./../../assets/glasses.png')}  
    style={{ width: 25, height: 25 }}
  />

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
          />
          <TextCard
            item={book.author}
            size={20}
            isNumeric={false}
            editItem={(el: string) => dispatch(updateBook({author: el}))}
          />
          <NumbersCard
            language={book.language}
            editLanguage={(el: string) => dispatch(updateBook({language: el}))}
            pageCount={book.pageCount}
            editPageCount={(el: string) => dispatch(updateBook({pageCount: el}))}
            publishedDate={book.publishedDate}
            editPublishedDate={(el: string) => dispatch(updateBook({publishedDate: el}))}
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
          <TitleHeader icon={boughtGivenOnIcon} title="Bought/Given On:" />
          <TextCard
            item={book.boughtGivenOn}
            size={20}
            isNumeric={true}
            editItem={(el: string) => dispatch(updateBook({boughtGivenOn: el}))}
          />
          <TitleHeader icon={givenByIcon} title="Given By:" />
          <TextCard
            item={book.givenBy}
            size={20}
            isNumeric={false}
            editItem={(el: string) => dispatch(updateBook({givenBy: el}))}
          />
          <TitleHeader icon={lastReadIcon} title="Last Read On:" />
          <TextCard
            item={book.lastRead}
            size={20}
            isNumeric={true}
            editItem={(el: string) => dispatch(updateBook({lastRead: el}))}
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

export default BookInfo;

type TitleHeaderTypes = {
  icon: any,
  title: string,
}

const TitleHeader = ({icon, title}: TitleHeaderTypes) => {
  return(
    <View style={styles.titleContainer}>
        <View>{icon}</View>
        <Text style={styles.title}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: '10%',
    backgroundColor: '#f1f1f1',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 10,
    marginTop: 30,
    borderTopColor: '#d0d0d0',
  },
  title: {
    color: '#000000',
    padding: 5,
    fontFamily: 'Courier Prime',
    fontWeight: 'bold',
    fontSize: 18,
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
    fontFamily: 'Courier Prime',
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
