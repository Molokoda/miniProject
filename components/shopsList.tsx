import React, {useState} from 'react';
import {  View, StyleSheet, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-gesture-handler';

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
        <View style = {[styles.container, {backgroundColor: props.theme.backgroundColor}]}>
            <TextInput 
                style = {{color: props.theme.color}} 
                placeholderTextColor = {props.theme.placeholderColor} 
                placeholder = {'Enter shop name'} 
                onChangeText = {(event: any) =>  filterShops(event, props.markers, setShops, isOnlyFavorite)}>
            </TextInput>
            <Button title = 'only favorite' onPress = { () => {onlyFavorite(props.markers, setShops, setIsOnlyFavorite)}}/>
            <Button title = 'show all' onPress = { () => {showAll(props.markers, setShops, setIsOnlyFavorite)}}/>
            { shops.map( (shop: any, index: number) => {
                let fav: string = '';
                if(shop.favorite){
                    fav = 'favorite'
                }
                else{
                    fav = 'unfavorite'
                }
               return(
                <View key = {index}>
                    <Text style = {{color: props.theme.color}}>Name: {shop.name}, type: {shop.shopType}</Text>
                    <Button title = {fav}   onPress =  { () => {changeFavorite(shop, setShops)} }/> 
                </View>
               ) 
            })} 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
});

export default ShopsList