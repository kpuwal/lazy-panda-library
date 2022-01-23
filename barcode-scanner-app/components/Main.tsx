import React from 'react';
import BookInfo from './book/BookInfo';
import ScannerCamera from './scanner/ScannerCamera';
import ScannerMain from './scanner/ScannerMain';

const Main = () => {
  console.log("Main")
  return (
    <>
      <ScannerCamera />
      <ScannerMain />
      <BookInfo />
    </>
  )
    
}

export default Main;

