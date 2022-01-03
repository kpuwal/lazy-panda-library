import React, { Component } from 'react';
import { View, Image } from 'react-native';

export class ScanningGIF extends Component {
  render() {
    return (
      <View>
        <Image 
        source={require('./../assets/5UKD.gif')}  
        style={{width: 150, height: 150, top: '-50%', marginLeft: '20%' }}
        />
      </View>
    )
  }
}

export default ScanningGIF
