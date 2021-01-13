import React from 'react';
import {useState} from 'react';
import {  StyleSheet, Button, Text, View, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import loginScheme from '../scheme/loginScheme'

async function loginUser(login: string, password: string, navigation: any, setUser: any){
    // let validate = await loginScheme.validate( {login: login, password: password} );
    // if(validate.error){
    //      alert(validate.error);
    // }
    // else{
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
          
    // }
}

type Props = {
  navigation: any,
  setUser: any
}

const LoginForm: React.FC<Props> = (props) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    return (
      <View style={styles.container}>
        <Text>Enter your login</Text>
        <TextInput placeholder = {'Enter your login'} onChange = {(event: any) => setLogin(event.target.value)}/>
        <Text>Enter your password</Text>
        <TextInput placeholder = {'Enter your password'} onChange = {(event: any) => setPassword(event.target.value)}/>
        <Button title = 'login' onPress = { () => loginUser(login, password, props.navigation, props.setUser)}/>
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