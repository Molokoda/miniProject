import React from 'react';
import {useState} from 'react';
import {  StyleSheet, Button, Text, View, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import loginScheme from '../scheme/loginScheme'
import { boolean } from 'joi';

async function loginUser(login: string, password: string, setShow: void, setUser: void){
    let validate = await loginScheme.validate( {login: login, password: password} );
    if(validate.error){
         alert(validate.error);
    }
    else{
        let temp: string = await AsyncStorage.getItem('users');
        if(temp){
          let arrayOfUser: [] = JSON.parse(temp);
          let checkUser = arrayOfUser.find( (user: {login: string, password: string, name: string}) => user.login === login)
          if( checkUser && checkUser.password === password ){
              AsyncStorage.setItem('isLogin', JSON.stringify({login: 'true', user: checkUser}) );
              setUser(checkUser);
              setShow('weatherWindow');
          }
          else{
              alert('Login or password is wrong');
          }
        }
        else{
          alert('There is no registrate user');
        }
          
    }
}

const LoginForm: React.FC<Props> = (props) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    return (
      <View style={styles.container}>
        <Text>Enter your login</Text>
        <TextInput placeholder = {'Enter your login'} onChange = {(event) => setLogin(event.target.value)}/>
        <Text>Enter your password</Text>
        <TextInput placeholder = {'Enter your password'} onChange = {(event) => setPassword(event.target.value)}/>
        <Button title = 'login' onPress = { () => loginUser(login, password, props.setShow, props.setUser)}/>
        <Button title = 'back' onPress = { () => props.setShow('main')}/>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  export default LoginForm;