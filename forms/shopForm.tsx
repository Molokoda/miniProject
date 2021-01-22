import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createShopScheme from '../scheme/createShopScheme'


async function addShop(name: string, shopType: any, latitude: string, longitude: string, navigation: any, setMarkers: any){
    let validate = createShopScheme.validate({name, shopType, latitude, longitude});
    if(validate.error){
        alert(validate.error);
    }
    else{
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
    }
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

const Item = (props: any) => (
    <TouchableOpacity onPress={props.onPress} style={[styles.item, props.style]}>
      <Text style={styles.title}>{props.item.title}</Text>
    </TouchableOpacity>
);

type Props = {
    navigation: any,
    setMarkers: any,
    theme: any
}

const ShopForm: React.FC<Props> = (props) => {
    const [selectedTitle, setSelectedTitle] = useState(null);
    const [name, setName] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const renderItem = ( props: any ) => {
        const backgroundColor = props.item.title === selectedTitle ? "#6e3b6e" : "#f9c2ff";
        return (
          <Item
            item={props.item}
            onPress={() => setSelectedTitle(props.item.title)}
            style={{ backgroundColor: backgroundColor }}
          />
        );
    };

    return (
      <View style={styles.container}>
        <Text style = { {color: props.theme.color} }>Enter shop name</Text>
        <TextInput 
            style = {{color: props.theme.color, borderWidth: 1, borderColor: props.theme.color, width: 200, paddingLeft: 10, marginBottom: 20}} 
            placeholderTextColor = {props.theme.placeholderColor} 
            placeholder = {'Enter shop name'} 
            onChangeText = {(event: any) =>  setName(event)} 
        />
        <Text style = { {color: props.theme.color} }>Enter shop latitude</Text>
        <TextInput 
            style = {{color: props.theme.color, borderWidth: 1, borderColor: props.theme.color, width: 200, paddingLeft: 10, marginBottom: 20}} 
            placeholderTextColor = {props.theme.placeholderColor} 
            placeholder = {'Enter shop latitude'} 
            onChangeText = {(event: any) => setLatitude(event)} 
        />
        <Text style = { {color: props.theme.color} }>Enter shop longitude</Text>
        <TextInput 
            style = {{color: props.theme.color, borderWidth: 1, borderColor: props.theme.color, width: 200, paddingLeft: 10, marginBottom: 20}} 
            placeholderTextColor = {props.theme.placeholderColor} 
            placeholder = {'Enter shop longitude'} 
            onChangeText = {(event: any) => setLongitude(event)}
        />
        <Text style = { {color: props.theme.color} }>Choose shop type</Text>
        <SafeAreaView style={styles.container}>
            <FlatList
                data={DATA}
                renderItem = {renderItem}
                keyExtractor={item => item.id}
                extraData = {selectedTitle}
            />
        </SafeAreaView>
        <TouchableOpacity
            style={styles.button}
            onPress = { () => addShop(name, selectedTitle, latitude, longitude, props.navigation, props.setMarkers) } 
        >
            <Text>Add shop</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
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
    button: {
        alignItems: "center",
        width: 150,
        borderRadius: 40,
        backgroundColor: "orange",
        padding: 10,
        marginBottom: 20
    },
  });

  export default ShopForm;