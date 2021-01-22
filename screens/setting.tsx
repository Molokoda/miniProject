import React, { useState } from 'react';
import {  View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { DarkTheme, DefaultTheme} from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
// import {notificationManager} from '../class/NotificationManager'



type Props = {
    city: any,
    isDark: boolean,
    setIsDark: any,
    theme: any,
    setTheme: any,
    navigatorTheme: any,
    setNavigatorTheme: any,
    setDistance: any,
    navigation: any
}

function changeTheme(isDark:boolean, setIsDark: any, setTheme: any, setNavigatorTheme: any) {
  if(isDark) {
    setTheme({backgroundColor: '#fff', color: '#000', placeholderColor: '#696969' });
    setIsDark(false); 
    setNavigatorTheme(DefaultTheme);

  }else{
    setTheme({backgroundColor: '#000', color: '#fff', placeholderColor: '#DCDCDC' });
    setIsDark(true);
    setNavigatorTheme(DarkTheme);
  } 
} 

function changeDistance(newDistance: any, setDistance: any, navigation: any){
  setDistance(newDistance)
  navigation.navigation.navigate('map')
}

const Setting: React.FC<Props> = (props) => {
  const [newDistance, setNewDistacnce] = useState('');
  return(
      <View style = {styles.container}>
          <Text style = { {color: props.theme.color} } >Your Location: {props.city[0].country}, {props.city[0].city} </Text>
          <TextInput 
            style = {{color: props.theme.color, borderWidth: 1, borderColor: props.theme.color, width: 200, paddingLeft: 10, marginTop: 20, marginBottom: 10}} 
            placeholderTextColor = {props.theme.placeholderColor} 
            placeholder = {'Enter distance'} 
            onChangeText = {(event: any) =>  setNewDistacnce(event)} 
          />

          <TouchableOpacity
            style={styles.button}
            onPress = { () => changeDistance(newDistance, props.setDistance, props.navigation)} 
          >
            <Text>Change distance</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress = { () =>  changeTheme(props.isDark, props.setIsDark, props.setTheme, props.setNavigatorTheme)  } 
          >
            <Text>Change theme</Text>
          </TouchableOpacity>

      </View>
  )
    
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      alignItems: "center",
      width: 150,
      borderRadius: 40,
      backgroundColor: "orange",
      padding: 10,
      marginBottom: 20
    },
});

export default Setting;