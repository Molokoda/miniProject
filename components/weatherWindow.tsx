import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useReducer } from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ImagePropTypes } from 'react-native';
import * as Location from 'expo-location';

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

const WeatherWindow: React.FC<Props> = (props) => {
    const [weatherForecast, setWeatherForecast] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [day, setDay] = useState(0);
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
        const host = `http://api.weatherapi.com/v1/forecast.json?key=668de3030ed24d8c9f833153202911&q=${city['coords'].latitude},${city['coords'].longitude}&days=3`;
        fetch(host).then(result => result.json()).then(result => {
            setWeatherForecast(result);
            setIsLoading(false);
        } );
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
                <Button title = 'today' onPress = {() => setDay(0)}></Button>
                <Button title = 'tomorrow' onPress = {() => setDay(1)}></Button>
                <Button title = 'day after tommorow' onPress = {() => setDay(2)}></Button>
                <View>
                    <Text style = { {color : setting.textColor}  } >Location: {weatherForecast.location.country}, {weatherForecast.location.region}, {weatherForecast.location.name}</Text>
                    <Text style = { {color : setting.textColor}  }>Tempreture: {weatherForecast.forecast.forecastday[day].hour[12].temp_c}°С</Text>
                    <Text style = { {color : setting.textColor}  }>FeelsLike: {weatherForecast.forecast.forecastday[day].hour[12].feelslike_c}°С</Text>
                    <Text style = { {color : setting.textColor}  }>Chance of rain: {weatherForecast.forecast.forecastday[day].hour[12].chance_of_rain}</Text>
                    <Text style = { {color : setting.textColor}  }>Chance of snow: {weatherForecast.forecast.forecastday[day].hour[12].chance_of_snow}</Text>
                    <Text style = { {color : setting.textColor}  }>Cloud: {weatherForecast.forecast.forecastday[day].hour[12].cloud}</Text>
                </View>
                <Button title = 'change theme' onPress = {() => changeTheme(setting, props.user, setSetting)}></Button>
                <Button title = 'logOut' onPress = { () => logOut(props.setShow)}/>
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

export default WeatherWindow;