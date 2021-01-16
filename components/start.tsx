import React from 'react';
import { StyleSheet,  View, Button } from 'react-native'
import {  DefaultTheme, DarkTheme } from '@react-navigation/native';

type Props = {
  navigation: any,
}


const Start: React.FC<Props> = (props) => {
  
  return(
    <View style={styles.container}>
      <Button title = "Login" onPress={() => props.navigation.navigate('login')} />
      <Button title = "Registration" onPress={() => props.navigation.navigate('registration')} />  
    </View>
  )
     
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });

export default Start;