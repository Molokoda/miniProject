import React, { useState } from 'react';
import { StyleSheet, Button, Text, View, TextInput, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import createShopScheme from '../scheme/createShopScheme'


async function addShop(name: string, shopType: any, latitude: string, longitude: string, navigation: any, setMarkers: any){
    // let validate = createShopScheme.validate({name, shopType, latitude, longitude});
    // if(validate.error){
    //     alert(validate.error);
    // }
    // else{
        let temp = await AsyncStorage.getItem('shops');
        if(temp){
            let arrayOfData: any = JSON.parse(temp);
            let shop = arrayOfData.find( (element: any) => element.name === name);
            if(shop){
                alert('Shop with such name has already exist');
            }
            else{
                arrayOfData.push({name: name, shopType: shopType, latitude: latitude, longitude: longitude, favorite: false});
                await AsyncStorage.setItem('shops', JSON.stringify(arrayOfData));
                setMarkers(arrayOfData);
                alert('Success');
                navigation.navigation.navigate('map');
            }
        }
        else{
            let arrayOfData = [{name: name, shopType: shopType, latitude: latitude, longitude: longitude, favorite: false}];
            await AsyncStorage.setItem('shops', JSON.stringify(arrayOfData));
            setMarkers(arrayOfData);
            alert('Success');
            navigation.navigation.navigate('map');
        }
    // }
}

const DATA = [
    {
        id: '0',
        title: 'food'
    },

    {
        id: '1',
        title: 'zoo'
    },

    {
        id: '2',
        title: 'construction'
    },

    {
        id: '3',
        title: 'hardware'
    },

    {
        id: '4',
        title: 'car'
    },
]

const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
);

type Props = {
    navigation: any,
    setMarkers: any
}

const ShopForm: React.FC<Props> = (props) => {
    const [selectedTitle, setSelectedTitle] = useState(null);
    const [name, setName] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const renderItem = ({ item }) => {
        const backgroundColor = item.title === selectedTitle ? "#6e3b6e" : "#f9c2ff";
        return (
          <Item
            item={item}
            onPress={() => setSelectedTitle(item.title)}
            style={{ backgroundColor: backgroundColor }}
          />
        );
    };

    return (
      <View style={styles.container}>
        <Text>Enter shop name</Text>
        <TextInput placeholder = {'Enter shop name'} onChangeText = {(event: any) =>  setName(event)} />
        <Text>Choose shop type</Text>
        <SafeAreaView style={styles.container}>
        <FlatList
            data={DATA}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            extraData = {selectedTitle}
        />
        </SafeAreaView>
        <Text>Enter shop latitude</Text>
        <TextInput placeholder = {'Enter shop latitude'} onChangeText = {(event: any) => setLatitude(event)} />
        <Text>Enter shop longitude</Text>
        <TextInput placeholder = {'Enter shop longitude'} onChangeText = {(event: any) => setLongitude(event)}/>
        <Button title = 'add shop' onPress = { () => addShop(name, selectedTitle, latitude, longitude, props.navigation, props.setMarkers) }/>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
      },
    title: {
        fontSize: 16,
    },
  });

  export default ShopForm;