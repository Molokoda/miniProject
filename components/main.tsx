import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useReducer } from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ImagePropTypes } from 'react-native';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';

async function logOut(setShow: void){
    await AsyncStorage.setItem('isLogin', JSON.stringify({login: 'false', user: ''}));
    setShow('main');
}

async function changeUser(user){
  // "Эта функция не работает "
  let temp = await AsyncStorage.getItem('users');
  let arrayOfData = JSON.parse(temp);
  let index = 0;
  arrayOfData.forEach( (element, index) => {
    if(element.login === user.logn){
      index = index;
    }
  })
  arrayOfData[index] = user; 
  await AsyncStorage.setItem('users', JSON.stringify(arrayOfData) );
}

async function changeTheme(setting, user, setSetting: void){
  if(setting.backgroundColor === 'white'){
    user.setting.backgroundColor = 'black';
    user.setting.textColor = 'white';
    await changeUser(user);
    setSetting({backgroundColor: 'black', textColor: 'white'});
  }
  else{
    user.setting.backgroundColor = 'white';
    user.setting.textColor = 'black';
    await changeUser(user);
    setSetting({backgroundColor: 'white', textColor: 'black'});
  }
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
            setErrorMsg('Permission to access location was denied');
            return;
          }
  
          let location = await Location.getCurrentPositionAsync({});
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
            <View style={[styles.container, {backgroundColor: setting.backgroundColor}]}>
                <Text style = { {color : setting.textColor}  }>Welcome, {props.user.name}</Text>
                <Button title = 'map' onPress = { () => alert('map')}/>
                <Button title = 'change theme' onPress = {() => changeTheme(setting, props.user, setSetting)}></Button>
                <Button title = 'logOut' onPress = { () => logOut(props.setShow)}/>
                {/* <MapView/> */}
            </View>
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