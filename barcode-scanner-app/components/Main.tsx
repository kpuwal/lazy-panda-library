import React from 'react';
import BookInfo from './book/BookInfo';
import ScannerCamera from './scanner/ScannerCamera';
import ScannerMain from './scanner/ScannerMain';

export default function Main() {
  
  return (
    <>
      <ScannerCamera />
      <ScannerMain />
      <BookInfo />
    </>
  )
    
}



