import React, {useEffect} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type PropsMapButton = {
    navigation: any
  }
  
  
const ToStart: React.FC<PropsMapButton> = (props) => {
    useEffect( () => {
        AsyncStorage.setItem('isLogin', JSON.stringify({login: 'false', user: ''}) );
        props.navigation.navigation.navigate('start');
    })
    return(
        <View></View>
    )
}

export default ToStart;