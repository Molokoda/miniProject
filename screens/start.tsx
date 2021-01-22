import React from 'react';
import { StyleSheet,  View, TouchableOpacity, Text } from 'react-native'

type Props = {
  navigation: any,
}


const Start: React.FC<Props> = (props) => {
  
  return(
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate('login')} 
      >
        <Text>Login</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => props.navigation.navigate('registration')} 
      >
        <Text>Registration</Text>
      </TouchableOpacity>
    </View>
  )
     
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20
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

export default Start;