import React, {useState} from 'react';
import {  View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

async function changeFavorite(shop: any, setShops: any){
    if(shop.favorite){
        shop.favorite = false;
    }
    else{
        shop.favorite = true;
    }
    
    let temp: any = await AsyncStorage.getItem('shops');
    let arrayOfShops = JSON.parse(temp);
    let index: number = 0;
    arrayOfShops.forEach( (element: any, i : number) => {
        if(element.name === shop.name){
            index = i;
        }
    });
    arrayOfShops[index] = shop;
    await AsyncStorage.setItem('shops', JSON.stringify(arrayOfShops));
    setShops(arrayOfShops);
}

function onlyFavorite(markers: any, setShops: any, setIsOnlyFavorite: any){
    let shops = markers.filter( (marker: any) => marker.favorite);
    setShops(shops);
    setIsOnlyFavorite(true);
}

function showAll(markers: any, setShops: any, setIsOnlyFavorite: any){
    setShops(markers);
    setIsOnlyFavorite(false);
}

function  filterShops(text: string, shops: any, setShops: any, isOnlyFavorite: boolean) {
    const reg: any =  RegExp(`^${text}\w{0,}`);
    if(isOnlyFavorite){
        shops = shops.filter( (shop: any) => shop.favorite);
    }
    let filterArray =  shops.filter( (shop: any) => reg.test(shop.name) );
    setShops(filterArray);
}

type Props = {
    markers: any,
    theme: any
}

const ShopsList: React.FC<Props> = (props) => {
    const [shops, setShops] = useState(props.markers);
    const [isOnlyFavorite, setIsOnlyFavorite] = useState(false);
    return(
        <ScrollView>
            <View style = {[styles.container, {backgroundColor: props.theme.backgroundColor}]}>
                <TextInput 
                    style = {{color: props.theme.color, borderWidth: 1, borderColor: props.theme.color, width: 200, paddingLeft: 10, marginTop: 20, marginBottom: 10}} 
                    placeholderTextColor = {props.theme.placeholderColor} 
                    placeholder = {'Enter shop name'} 
                    onChangeText = {(event: any) =>  filterShops(event, props.markers, setShops, isOnlyFavorite)}>
                </TextInput>

                <TouchableOpacity
                    style={styles.button}
                    onPress = { () => {onlyFavorite(props.markers, setShops, setIsOnlyFavorite)}}
                >
                    <Text>Only favorite</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress = { () => {showAll(props.markers, setShops, setIsOnlyFavorite)}}
                >
                    <Text>Show all</Text>
                </TouchableOpacity>
                { shops.map( (shop: any, index: number) => {
                    return(
                        <View key = {index} style = {styles.container}>
                            <Text style = {{color: props.theme.color}}>Name: {shop.name}, type: {shop.shopType}</Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress =  { () => {changeFavorite(shop, setShops)} }
                            >
                                <Text> {shop.favorite ? 'Unfavorite' : 'Favorite' } </Text>
                            </TouchableOpacity>

                        </View>
                ) 
                })} 
            </View>
        </ScrollView>
    );
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

export default ShopsList