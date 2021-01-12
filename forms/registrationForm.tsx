import React, { useState } from 'react';
import { StyleSheet, Button, Text, View, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import regScheme from '../scheme/registrationScheme'

async function regNewUser(login: string, password: string, name: string, setShow: void){
    let validate = await regScheme.validate({ login: login, password: password, name: name});
    if(validate.error){
        alert(validate.error);
    }
    else{
        let temp = await AsyncStorage.getItem('users');
        
        if(temp){
          let arrayOfUser: [] = JSON.parse(temp);
          let checkUser = arrayOfUser.find( (user: {login: string, password: string, name: string}) => user.login === login)
          if( checkUser ){
              alert('User with such login has already exist');
          }
          else{
              let user = {
                  login: login,
                  password: password,
                  name: name,
                  setting: {
                    backgroundColor: 'white'
                  }
              }
              arrayOfUser.push(user);
              await AsyncStorage.setItem('users', JSON.stringify(arrayOfUser));
              alert('Success');
              setShow('main');
          }
        }
        else{
          let user = {
            login: login,
            password: password,
            name: name,
            setting: {
              backgroundColor: 'white',
              textColor: 'black'
            }
          }
          let arrayOfUser: [] = [];
          arrayOfUser.push(user);
          await AsyncStorage.setItem('users', JSON.stringify(arrayOfUser));
          alert('Success');
          setShow('main');
        }  
    }
}

const RegistrationForm: React.FC<Props> = (props) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    return (
      <View style={styles.container}>
        <Text>Enter your login</Text>
        <TextInput placeholder = {'Enter your login'} onChange = {(event) => setLogin(event.target.value)} />
        <Text>Enter your password</Text>
        <TextInput placeholder = {'Enter your password'} onChange = {(event) => setPassword(event.target.value)} />
        <Text>Enter your name</Text>
        <TextInput placeholder = {'Enter your name'} onChange = {(event) => setName(event.target.value)}/>
        <Button title = 'registration' onPress = { () => regNewUser(login, password, name, props.setShow) }/>
        <Button title = 'back' onPress = { () => props.setShow('main') }/>
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

  export default RegistrationForm;