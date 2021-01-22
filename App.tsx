import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import Start from './screens/start'
import { NavigationContainer, DefaultTheme} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from './forms/loginForm'
import RegistrationForm from './forms/registrationForm'
import Main from './screens/main'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, Text, View } from 'react-native'
import {notificationManager} from './class/NotificationManager'

// notificationManager.configure();
const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState('');
  const [startScreen, setStartScreen] = useState('start');
  const [logCheck, setLogCheck] = useState(false);
  const [theme, setTheme] = useState({backgroundColor: '#fff', color: '#000', placeholderColor: '#696969' });
  const [isDark, setIsDark] = useState(false);
  const [navigatorTheme, setNavigatorTheme] = useState(DefaultTheme);
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
      <NavigationContainer theme = {navigatorTheme}>
        <Stack.Navigator initialRouteName = { startScreen } screenOptions = {{
          headerStyle: {
            backgroundColor: '#009387',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        }}>
         <Stack.Screen name="start">
            { (props) => <Start navigation = {props.navigation}  />}
          </Stack.Screen>
          
          <Stack.Screen name="login">
            { (navigation) => <LoginForm  navigation = {navigation} setUser = {setUser} theme = {theme}/>  }
          </Stack.Screen>
  
          <Stack.Screen name="registration">
            { (navigation) => <RegistrationForm  navigation = {navigation} theme = {theme}/>  }
          </Stack.Screen>
          
          <Stack.Screen name="main">
            { (navigation) => <Main  
                                navigation = {navigation} 
                                setUser = {setUser} user = {user} 
                                isDark = {isDark} setIsDark = {setIsDark} 
                                theme = {theme} setTheme = {setTheme}
                                navigatorTheme = {navigatorTheme}
                                setNavigatorTheme = {setNavigatorTheme}
                              /> 
                               
            }
          </Stack.Screen>
  
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});