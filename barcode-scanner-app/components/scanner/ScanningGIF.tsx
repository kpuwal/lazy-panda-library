import React, { Component } from 'react';
import { Image } from 'react-native';

export class ScanningGIF extends Component {
  render() {
  console.log("ScanningGIF")
    return (
      <Image 
      source={require('./../../assets/5UKD.gif')}  
      style={{ width: 150, height: 150 }}
      />
    )
  }
}

export default React.memo(ScanningGIF);
