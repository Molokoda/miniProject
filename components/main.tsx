import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Dimensions } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginForm from '../forms/loginForm'
import RegistrationForm from '../forms/registrationForm'
import WeatherWindow from './weatherWindow'
import ShopForm from '../forms/shopForm'
import MapView from 'react-native-maps';

const Main: React.FC = () => {
    const [show, setShow] = useState('main');
    const [user, setUser] = useState('');
    let temp: string = '';
    AsyncStorage.getItem('isLogin').then(result => temp = result)

    useEffect( () => {
      setTimeout(() =>  {
        if(!user){
          let isLogin = JSON.parse(temp);
          if(isLogin.login === 'true'){
            setUser(isLogin.user);
            setShow('weatherWindow');
          }
        }   
      }, 300 )
       
    })

    if( show === 'main'){
      return (
        <View style={styles.container}>
          <Button title = "Login" onPress={() => setShow('login')} />
          <Button title = "Registration" onPress={() => setShow('registration')} />
          <Button title = "add shop" onPress={() => setShow('createShop')} />
          {/* <MapView style={styles.map} /> Этот компонент не работает*/}
        </View>
      );
    }
    else if( show === 'login'){
      return(
        <LoginForm setUser = {setUser} setShow = {setShow}/>
      )
    } 
    else if(show === 'registration'){
      return(
        <RegistrationForm setShow = {setShow}/>
      )
    }
    else if(show === 'createShop'){
      return(
        <ShopForm setShow = {setShow}/>
      )
    }
    else if(show === 'weatherWindow'){
      return(
        <WeatherWindow user = {user} setShow = {setShow}/>
      )
    }  
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

export default Main;