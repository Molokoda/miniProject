import React, { useState } from 'react';
import { StyleSheet, Button, Text, View, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import regScheme from '../scheme/registrationScheme'

async function regNewUser(login: string, password: string, name: string, navigation: any){
    let validate = await regScheme.validate({ login: login, password: password, name: name});
    if(validate.error){
        alert(validate.error);
    }
    else{
        let temp = await AsyncStorage.getItem('users');
        
        if(temp){
          let arrayOfUser: any = JSON.parse(temp);
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
              navigation.navigation.navigate('start');
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
          let arrayOfUser: any = [];
          arrayOfUser.push(user);
          await AsyncStorage.setItem('users', JSON.stringify(arrayOfUser));
          alert('Success');
          navigation.navigation.navigate('main');
        }  
    }
}

type Props = {
  navigation: any,
  theme: any
}


const RegistrationForm: React.FC<Props> = (props) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
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
        <Text style = { {color: props.theme.color} } >Enter your name</Text>
        <TextInput 
          style = {{color: props.theme.color}} 
          placeholderTextColor = {props.theme.placeholderColor} 
          placeholder = {'Enter your name'} 
          onChangeText = {(event: any) => setName(event)}
        />
        <Button title = 'registration' onPress = { () => regNewUser(login, password, name, props.navigation) }/>
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

  export default RegistrationForm;