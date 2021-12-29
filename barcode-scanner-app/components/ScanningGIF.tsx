import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

export class ScanningGIF extends Component {
  render() {
    return (
      <View>
        <Image 
        source={require('./../assets/5UKD.gif')}  
        style={{width: 150, height: 150 }}
        />
      </View>
    )
  }
}

export default ScanningGIF
