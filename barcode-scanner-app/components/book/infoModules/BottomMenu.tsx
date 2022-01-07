import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type BottomMenuTypes = {
  handleScan: any,
  handleSave: any,
}

const BottomMenu = ({handleScan, handleSave}: BottomMenuTypes) => {
  return (
    <View style={styles.container}>
      <View style={styles.buttonSet}>
        <Pressable
          style={styles.button}
          onPress={handleScan}
        >
          <>
            <Text style={styles.buttonLabel}>Scan</Text>
            <MaterialCommunityIcons name="repeat" size={15} color="#000000" />
          </>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={handleSave}
        >
          <Text style={styles.buttonLabel}>Save</Text>
          <MaterialCommunityIcons name="database-plus" size={15} color="#000000" />
        </Pressable>
      </View>
    </View>
  )
}

export default BottomMenu;

const styles = StyleSheet.create({});
