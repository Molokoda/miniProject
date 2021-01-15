import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useReducer } from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ImagePropTypes } from 'react-native';
import * as Location from 'expo-location';
import Map from './map'
import { createDrawerNavigator } from '@react-navigation/drawer';
import ShopForm from '../forms/shopForm';
import Setting from './setting'
import ShopsList from './shopsList';
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

type PropsMapButton = {
  navigation: any
}

const MapButton: React.FC<PropsMapButton> = (props) => {
  return(
    <View style = {styles.container}>
      <Button title = 'map' onPress = { () => props.navigation.navigation.navigate('map')}/>
    </View>
  )
}

const ToStart: React.FC<PropsMapButton> = (props) => {
  useEffect( () => {
    AsyncStorage.setItem('isLogin', JSON.stringify({login: 'false', user: ''}) );
    props.navigation.navigation.navigate('start');
  })
  return(
    <View></View>
  )
}

const Main: React.FC<Props> = (props) => {
    
    const [isLoading, setIsLoading] = useState(true);
    const [coords, setCoords] = useState('');
    const [city, setCity] = useState('');
    const [markers, setMarkers] = useState([]);
    let temp: any = '';
    AsyncStorage.getItem('shops').then(result => temp = result)
    useEffect(() => {
      if(!coords){
        (async () => {
          let { status } = await Location.requestPermissionsAsync();
          if (status !== 'granted') {
            alert('Permission to access location was denied');
            return;
          }
  
          let location: any = await Location.getCurrentPositionAsync({});
          setCoords(location);
          location = await Location.reverseGeocodeAsync( {latitude: location.coords.latitude, longitude: location.coords.longitude} );
          setCity(location);
        })();
      }
      setTimeout( () => {
        if(coords && isLoading){
          setMarkers(JSON.parse(temp));
          setIsLoading(false);
        }
      }, 300)
    })

    if(isLoading){        
        return(
            <View style = {styles.container}>  
              <Text>Is loading...</Text>
            </View>
        )
    }
    else{
        return(
          <Drawer.Navigator > 

            <Drawer.Screen name = "main" >
              { (navigation) => <MapButton navigation = {navigation}/> }
            </Drawer.Screen>

            <Drawer.Screen name = "setting" >
              { () => <Setting city = {city}/> }
            </Drawer.Screen>

            <Drawer.Screen name = "map" >
              { () => <Map coords = {coords.coords} markers = {markers}/> }
            </Drawer.Screen>
            

            <Drawer.Screen name = "shopsList" >
              { () => <ShopsList markers = {markers}/> }
            </Drawer.Screen>

            <Drawer.Screen name = "newShop" >
              { (navigation) => <ShopForm navigation = {navigation} setMarkers = {setMarkers}/> }
            </Drawer.Screen >

            <Drawer.Screen name = "Log out" >
              { (navigation) => <ToStart navigation = {navigation} setMarkers = {setMarkers}/> }
            </Drawer.Screen >
          </Drawer.Navigator >
        
        )
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Main;