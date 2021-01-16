import React from 'react';
import {  View, StyleSheet, Text, Button } from 'react-native';
import { DarkTheme, DefaultTheme} from '@react-navigation/native';

type Props = {
    city: any,
    isDark: boolean,
    setIsDark: any,
    theme: any,
    setTheme: any,
    navigatorTheme: any,
    setNavigatorTheme: any
}

function changeTheme(isDark:boolean, setIsDark: any, setTheme: any, setNavigatorTheme: any) {
  if(isDark) {
    setTheme({backgroundColor: '#fff', color: '#000', placeholderColor: '#696969' });
    setIsDark(false); 
    setNavigatorTheme(DefaultTheme);

  }else{
    setTheme({backgroundColor: '#000', color: '#fff', placeholderColor: '#DCDCDC' });
    setIsDark(true);
    setNavigatorTheme(DarkTheme);
  } 
} 

const Setting: React.FC<Props> = (props) => {
    return(
        <View style = {styles.container}>
            <Text style = { {color: props.theme.color} } >Your Location: {props.city[0].country}, {props.city[0].city} </Text>
            <Button title = 'chnage theme' onPress = { () => { changeTheme(props.isDark, props.setIsDark, props.setTheme, props.setNavigatorTheme) } }  />
        </View>
    )
    
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default Setting;