import React from 'react';
import { StyleSheet, Text, View, Button, Dimensions, TextInput } from 'react-native'

type Props = {
  navigation: any
}



const Start: React.FC<Props> = ({navigation}) => {
  
  return(
    <View style={styles.container}>
      <Button title = "Login" onPress={() => navigation.navigate('login')} />
      <Button title = "Registration" onPress={() => navigation.navigate('registration')} />  
          
    </View>
  )
     
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });

export default Start;