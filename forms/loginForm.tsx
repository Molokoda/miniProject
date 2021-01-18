import React from 'react';
import {useState} from 'react';
import {  StyleSheet, Button, Text, View, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import loginScheme from '../scheme/loginScheme'

async function loginUser(login: string, password: string, navigation: any, setUser: any){
    let validate = await loginScheme.validate( {login: login, password: password} );
    if(validate.error){
      console.log(validate);
      alert(validate.error);
    }
    else{
        let temp: any = await AsyncStorage.getItem('users');
        if(temp){
          let arrayOfUser: [] = JSON.parse(temp);
          let checkUser: any = arrayOfUser.find( (user: {login: string, password: string, name: string}) => user.login === login)
          if( checkUser && checkUser.password === password ){
              AsyncStorage.setItem('isLogin', JSON.stringify({login: 'true', user: checkUser}) );
              setUser(checkUser);
              navigation.navigation.navigate('main');
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

type Props = {
  navigation: any,
  setUser: any,
  theme: any
}

const LoginForm: React.FC<Props> = (props) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    return (
      <View style={styles.container}>
        <Text style = { {color: props.theme.color} } >Enter your login</Text>
        <TextInput 
          style = {{color: props.theme.color}} 
          placeholderTextColor = {props.theme.placeholderColor}  
          placeholder = {'Enter your login'} 
          onChangeText = {(event: any) => setLogin(event)}
        />
        <Text style = { {color: props.theme.color} } >Enter your password</Text>
        <TextInput 
          style = {{color: props.theme.color}} 
          placeholderTextColor = {props.theme.placeholderColor} 
          placeholder = {'Enter your password'}
          onChangeText = {(event: any) => setPassword(event)}
        />
        <Button title = 'login' onPress = { () => loginUser(login, password, props.navigation, props.setUser)}/>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  export default LoginForm;