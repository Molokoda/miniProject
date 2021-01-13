import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useReducer } from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ImagePropTypes } from 'react-native';
import * as Location from 'expo-location';
import Map from './map'
import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();


async function logOut(setShow: any){
    await AsyncStorage.setItem('isLogin', JSON.stringify({login: 'false', user: ''}));
    setShow('main');
}

type Props = {
  user: any,
  setUser: any,
  navigation: any
  
}

const MapButton: React.FC<Props> = (props) => {
  return(
    <View style = {styles.container}>
      <Button title = 'map' onPress = { () => alert('map')}/>
    </View>
  )
}

const Main: React.FC<Props> = (props) => {
    
    const [isLoading, setIsLoading] = useState(true);
    const [city, setCity] = useState('');
    const [setting, setSetting] = useState({backgroundColor: props.user.setting.backgroundColor, textColor: props.user.setting.textColor });
    useEffect(() => {
      if(!city){
        (async () => {
          let { status } = await Location.requestPermissionsAsync();
          if (status !== 'granted') {
            alert('Permission to access location was denied');
            return;
          }
  
          let location: any = await Location.getCurrentPositionAsync({});
          setCity(location);
        })();
      }
      
      if(city && isLoading){
        setIsLoading(false);
        
      }
    })

    if(isLoading){        
        return(
            <View style = {[styles.container, {backgroundColor: props.user.setting.backgroundColor}]}>  
            <Text>Is loading...</Text>
            </View>
        )
    }
    else{
        return(
          <Drawer.Navigator > 
            <Drawer.Screen  name = "Main" component = {MapButton}/>
            <Drawer.Screen  name = "Map" component = {Map}/>
          </Drawer.Navigator >
        
        )
    }
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
     // backgroundColor: 'black',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Main;