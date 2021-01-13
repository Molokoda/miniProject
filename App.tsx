import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import Start from './components/start'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from './forms/loginForm'
import RegistrationForm from './forms/registrationForm'
import Main from './components/main'
import AsyncStorage from '@react-native-async-storage/async-storage';
//import loginScheme from './scheme/loginScheme'
//import regScheme from './scheme/registrationScheme'
import { StyleSheet, Text, View, Button, Dimensions, TextInput } from 'react-native'

const Stack = createStackNavigator();



export default function App() {
  const [user, setUser] = useState('');
  const [startScreen, setStartScreen] = useState('start');
  const [logCheck, setLogCheck] = useState(false);
  let temp: any = '';
  AsyncStorage.getItem('isLogin').then(result => temp = result)
  
  type isLog ={
    login: string,
    user: any
  }

  useEffect( () => {
    let isLogin: isLog;
    setTimeout(() =>  {
      if(logCheck === false && !temp){
        setLogCheck(true);
      }
      else if(logCheck === false){
        isLogin = JSON.parse(temp);
        if(isLogin.login === 'true'){
          setUser(isLogin.user);
          setStartScreen('main');
        }
        setLogCheck(true);
      }  
    }, 300)
      
  })

  if(logCheck === false){
    return(
      <View style = {styles.container}>
        <Text>is loading...</Text>
      </View>
    )
  }
  else{
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName = { startScreen} screenOptions = {{
          headerStyle: {
            backgroundColor: '#009387',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }}>
         <Stack.Screen name="start">
            {props => <Start {...props}  />}
          </Stack.Screen>
          
          <Stack.Screen name="login">
            { (navigation) => <LoginForm  navigation = {navigation} setUser = {setUser} />  }
          </Stack.Screen>
  
          <Stack.Screen name="registration">
            { (navigation) => <RegistrationForm  navigation = {navigation} />  }
          </Stack.Screen>
          
          <Stack.Screen name="main">
            { (navigation) => <Main  navigation = {navigation} setUser = {setUser} user = {user}/>  }
          </Stack.Screen>
  
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});