import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import * as Location from 'expo-location';
import Map from './map'
import { createDrawerNavigator } from '@react-navigation/drawer';
import ShopForm from '../forms/shopForm';
import Setting from './setting'
import ShopsList from './shopsList';


const Drawer = createDrawerNavigator();

type Props = {
  user: any,
  setUser: any,
  navigation: any
  isDark: any,
  setIsDark: any,
  theme: any,
  setTheme: any,
  navigatorTheme : any
  setNavigatorTheme: any
}

type PropsMapButton = {
  navigation: any
}

const MapButton: React.FC<PropsMapButton> = (props) => {
  return(
    <View style = {styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress = { () => props.navigation.navigation.navigate('map')}
      >
        <Text> Map </Text>
      </TouchableOpacity>
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
    const [distance, setDistance] = useState(3);
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
            <View style = { [styles.container, {backgroundColor: props.theme.backgroundColor}]}>  
              <Text style = {{color: props.theme.color}}>Is loading...</Text>
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
                { (navigation) => <Setting 
                          city = {city} 
                          isDark = {props.isDark} 
                          setIsDark = {props.setIsDark} 
                          theme = {props.theme} 
                          setTheme = {props.setTheme}
                          navigatorTheme = {props.navigatorTheme}
                          setNavigatorTheme = {props.setNavigatorTheme}
                          setDistance = {setDistance}
                          navigation = {navigation}
                        /> 
                }
              </Drawer.Screen>

              <Drawer.Screen name = "map" >
                { () => <Map markers = {markers} isDark = {props.isDark} theme = {props.theme} coords = {coords} distance = {distance}/> }
              </Drawer.Screen>
              

              <Drawer.Screen name = "shopsList" >
                { () => <ShopsList markers = {markers} theme = {props.theme}/> }
              </Drawer.Screen>

              <Drawer.Screen name = "newShop" >
                { (navigation) => <ShopForm navigation = {navigation} setMarkers = {setMarkers} theme = {props.theme}/> }
              </Drawer.Screen >

              <Drawer.Screen name = "Log out" >
                { (navigation) => <ToStart navigation = {navigation}/> }
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
  button: {
    alignItems: "center",
    width: 150,
    borderRadius: 40,
    backgroundColor: "orange",
    padding: 10,
    marginBottom: 20
  },
});

export default Main;