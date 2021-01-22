import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';


type PropsMapButton = {
    navigation: any
}

const MapButton: React.FC<PropsMapButton> = (props) => {
    return(
      <View style = {styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress = { () => props.navigation.navigation.navigate('map')}
        >
          <Text> Map </Text>
        </TouchableOpacity>
      </View>
    )
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
},
button: {
    alignItems: "center",
    width: 150,
    borderRadius: 40,
    backgroundColor: "orange",
    padding: 10,
    marginBottom: 20
},
});


export default MapButton;