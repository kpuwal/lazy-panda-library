import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, Keyboard, Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import BookForm from './components/BookForm';
import ScanningGIF from './components/ScanningGIF';
import { APP_ENV_IP, APP_ENV_ADDRESS } from '@env';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [isLoaded, setLoaded] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [scanned, setScanned] = useState(false);

  const [toSaveValues, setToSaveValues]= useState({
    title: '',
    author: '',
    language: '',
    publishedDate: '',
    pageCount: '',
    genre: '',
    series: '',
    world: '',
    readBy: '',
  })

  const [bookData, setBookData] = useState({
    title: '',
    subtitle: '',
    authors: [],
    pageCount: 0,
    publishedDate: '',
    language: '',
  })

  const [pickerData, setPickerData] = useState({
    genre: [{label: '', value: ''}],
    series: [{label: '', value: ''}],
    world: [{label: '', value: ''}],
    readBy: [{label: '', value: ''}],
  })

  const createPickerCategory = (items: string[]) => {
    return items.map((el: string): {label: string, value: string} => 
      {
        return {label: el, value: el}
      }
    )
  }

  const fetchPickerData = async () => {
    try {
      const newsData = await fetch(`${APP_ENV_ADDRESS}/api/picker`);
      const json = await newsData.json();
      const shiftedValues = json.values.map((item: string[]) => {
        item.shift();
        return item;
      })
      const genre = createPickerCategory(shiftedValues[0]);
      const series = createPickerCategory(shiftedValues[1]);
      const world = createPickerCategory(shiftedValues[2]);
      const readBy = createPickerCategory(shiftedValues[3]);
   
      setPickerData({
        genre: genre,
        series: series,
        world: world,
        readBy: readBy,
      });
    } catch(err) {
      alert('server not connected') // FIX errors!
    }
  }

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      fetchPickerData();
    })();
    // clearBookForm();
  }, []);

  type BarCodeScannerTypes = {
    type: string,
    data: string,
  }

  const clearBookForm = () => {
    setBookData({
      title: '',
      subtitle: '',
      authors: [],
      pageCount: 0,
      publishedDate: '',
      language: '',
    })
  }

  const handleBarCodeScanned = ({ type, data }: BarCodeScannerTypes) => {
    clearBookForm();
    setLoaded(false);
    fetchData(data);
    setDisabled(false);
    setScanned(true);
  };

  const fetchData = async (isbn: string) => {
    const config = {
      method: 'POST',
      body: JSON.stringify({isbn}),
      headers: { 
        'Content-Type': 'application/json',
       }
    } 
    
    try {
      const newsData = await fetch(`${APP_ENV_ADDRESS}/api/book`, config);
      const json = await newsData.json();

      if (json.totalItems === 0) {
        alert("Sorry, the book was not found in the database");
      } else {
        const data = json.items[0].volumeInfo;
        setBookData({
          title: data.title,
          subtitle: data.subtitle === undefined ? "" : data.subtitle,
          authors: data.authors,
          pageCount: data.pageCount,
          publishedDate: data.publishedDate,
          language: data.language,
        });
      }
    } catch(err) {
      alert('server not connected') // FIX errors!
    } finally {
      setLoaded(true);
    };
  }

  const saveDataToDB = async () => {
    const config = {
      method: 'POST',
      body: JSON.stringify({
        title: toSaveValues.title,
        author: toSaveValues.author,
        language: toSaveValues.language,
        publishedDate: toSaveValues.publishedDate,
        pageCount: toSaveValues.pageCount,
        genre: toSaveValues.genre,
        series: toSaveValues.series,
        world: toSaveValues.world,
        readBy: toSaveValues.readBy,
      }),
      headers: { 
        'Content-Type': 'application/json',
       }
    }
    setDisabled(true);

    try {
      await fetch(`${APP_ENV_ADDRESS}/api/add-book`, config);
    } catch(err) {
      alert('ERROR saving the book!') // FIX errors!
    }
  }

  const handleSave = (title: string, author: string, language: string, publishedDate: string, pageCount: string, genre: string, series: string, world: string, readBy: string) => {
    setToSaveValues({...{title, author, language, publishedDate, pageCount, genre, series, world, readBy}})
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {
          scanned && isLoaded ? 
          (
            <BookForm {...{bookData, pickerData, handleSave}}>
              <View style={styles.buttonSet}>
              <TouchableHighlight
                style={styles.button}
                onPress={() => setScanned(false)}
              >
                <Text style={styles.buttonLabel}>Scan Again</Text>
              </TouchableHighlight>
              <TouchableHighlight
                disabled={isDisabled}
                style={isDisabled ? [styles.button, styles.disabledButton] : styles.button}
                onPress={() => saveDataToDB()}
              >
                <Text style={styles.buttonLabel}>Save to DB</Text>
              </TouchableHighlight>
              </View>
            </BookForm>) :
            <ScanningGIF />
        }
        {scanned ? <View /> : <Text style={styles.infoTxt}>Scanning ...</Text>}
        {!scanned || isLoaded ? <View /> : <Text style={styles.infoTxt}>Loading ... </Text>}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSet: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }, 
  button: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    backgroundColor: '#0080FF'
  },
  buttonLabel: {
    color: '#fff',
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#9d9d9d',
  },
  infoTxt: {
    // color: '#0080FF',
    color: 'red',
    fontWeight: 'bold',
    fontSize: 20,
  }
});
