import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Dimensions, TextInput } from 'react-native'
import MapView from 'react-native-maps';

type Props = {
  navigation: any
}



const Start: React.FC<Props> = ({navigation}) => {
  
  return(
    <View style={styles.container}>
      <Button title = "Login" onPress={() => navigation.navigate('login')} />
      <Button title = "Registration" onPress={() => navigation.navigate('registration')} />  
          
    </View>
  )
     
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  });

export default Start;