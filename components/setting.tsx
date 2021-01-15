import React, {useState, useEffect} from 'react';
import {  View, StyleSheet, Text } from 'react-native';

type Props = {
    city: any
}

const Setting: React.FC<Props> = (props) => {
    return(
        <View style = {styles.container}>
            <Text>Your Location: {props.city[0].country}, {props.city[0].city} </Text>
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