import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Dimensions, TextInput } from 'react-native'
import MapView from 'react-native-maps';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginForm from '../forms/loginForm'
import RegistrationForm from '../forms/registrationForm'
// import Main from './main'
// import ShopForm from '../forms/shopForm'

const Start: React.FC = () => {
    const [show, setShow] = useState('main');
    const [user, setUser] = useState('');
    // let temp: string = '';
    // AsyncStorage.getItem('isLogin').then(result => temp = result)

    // useEffect( () => {
    //   setTimeout(() =>  {
    //     if(!user){
    //       let isLogin = JSON.parse(temp);
    //       if(isLogin.login === 'true'){
    //         setUser(isLogin.user);
    //         setShow('weatherWindow');
    //       }
    //     }   
    //   }, 300 )
       
    // })

    if( show === 'main'){
      return (
        <View style={styles.container}>
          <Button title = "Login" onPress={() => setShow('login')} />
          <Button title = "Registration" onPress={() => setShow('registration')} />  
               
        </View>
      );
    }
    else if( show === 'login'){
      return(
        <LoginForm setUser = {setUser} setShow = {setShow}/>
      )
    } 
    // else if(show === 'registration'){
    //   return(
    //     <RegistrationForm setShow = {setShow}/>
    //   )
    // }
    // else if(show === 'createShop'){
    //   return(
    //     <ShopForm setShow = {setShow}/>
    //   )
    // }
    // else if(show === 'weatherWindow'){
    //   return(
    //     <Main user = {user} setShow = {setShow}/>
    //   )
    // }  
  }
  
  // function loginUser(){

  // }
  // const LoginForm: React.FC<Props> = (props) => {
  //   const [login, setLogin] = useState('');
  //   const [password, setPassword] = useState('');
  //   return (
  //     <View style={styles.container}>
  //       <Text>Enter your login</Text>
  //       <TextInput placeholder = {'Enter your login'} onChange = {(event) => setLogin(event.target.value)}/>
  //       <Text>Enter your password</Text>
  //       <TextInput placeholder = {'Enter your password'} onChange = {(event) => setPassword(event.target.value)}/>
  //       <Button title = 'login' onPress = { () => loginUser(login, password, props.setShow, props.setUser)}/>
  //       <Button title = 'back' onPress = { () => props.setShow('main')}/>
  //     </View>
  //   );
  // }
  



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