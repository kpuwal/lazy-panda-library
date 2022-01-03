import React, { Component } from 'react';
import { Image } from 'react-native';

export class ScanningGIF extends Component {
  render() {
    return (
      <Image 
      source={require('./../../assets/5UKD.gif')}  
      style={{ width: 150, height: 150, marginLeft: '20%', marginTop: '45%'}}
      />
    )
  }
}

export default ScanningGIF;
