import React from 'react';
import {  View, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

type Props = {

}

const Map: React.FC<Props> = (props) => {
    return(
        <View style = {styles.container}>
            <MapView style = {styles.map}/>
        </View>
    ) 
}


const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      height: 400,
      width: 400,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
});

export default Map;