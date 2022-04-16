import React,{ useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,ActivityIndicator,ScrollView,Image,FlatList } from 'react-native';

import MediaComponent from './Components/MediaComponent';
export default function App() {

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <MediaComponent/>
    </View>  
  );
}

const styles = StyleSheet.create({
  container: {

    backgroundColor: '#fff',
    justifyContent:'center',
    alignItems:'center'
  },
});
