import React, {useState, useEffect} from 'react';
import {  View, StyleSheet, Button, TextInput, Text } from 'react-native';
import MapView, {Marker, MarkerAnimated} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';

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

const shopTypes = {
  food: require('../assets/food.png'),
  zoo: require('../assets/zoo.png'),
  hardware: require('../assets/hardware.png'),
  construction: require('../assets/construction.png'),
  car: require('../assets/car.png')
}

function  filterShops(text: string, shops: any, setShops: any, isOnlyFavorite: boolean) {
  const reg: any =  RegExp(`^${text}\w{0,}`);
  if(isOnlyFavorite){
      shops = shops.filter( (shop: any) => shop.favorite);
  }
  let filterArray =  shops.filter( (shop: any) => reg.test(shop.name) );
  setShops(filterArray);
}

function showMarkerInfo(setModalVisible: any, setMarkerInfo: any, shop: any, setCurrentShop: any) {
  setModalVisible(true);
  setMarkerInfo(`${shop.name}, ${shop.shopType}`);
  setCurrentShop(shop);
}

type Props = {
  coords: any,
  markers: any
}

const Map: React.FC<Props> = (props) => {
  const [shops, setShops] = useState(props.markers);
  const [isOnlyFavorite, setIsOnlyFavorite] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [markerInfo, setMarkerInfo] = useState('');
  const [currentShop, setCurrentShop] = useState({});
  return(
    <View style = {styles.map}>
        <MapView style = {styles.map}>
        { shops.map( (shop: any, index: number) => {
              let type;
              if(shop.shopType == 'food'){
                type = shopTypes.food;
              }
              else if(shop.shopType == 'zoo'){
                type = shopTypes.zoo;
              }
              else if(shop.shopType == 'hardware'){
                type = shopTypes.hardware;
              }
              else if(shop.shopType == 'construction'){
                type = shopTypes.construction;
              }
              else if(shop.shopType == 'car'){
                type = shopTypes.car;
              }
               return(
                <Marker 
                  key = {index} 
                  coordinate = { {latitude: Number(shop.latitude), longitude: Number(shop.longitude)} } 
                  image = { type }
                  onPress = { () => {showMarkerInfo(setModalVisible, setMarkerInfo, shop, setCurrentShop)}}
                />
               ) 
            } ) } 
        </MapView >
        <View style = {styles.searchBox}>
          <TextInput 
            placeholder = {'Enter shop name'} 
            placeholderTextColor = '#fff'
            autoCapitalize = 'none'
            onChangeText = {(event: any) =>  filterShops(event, props.markers, setShops, isOnlyFavorite)}
          />

        </View>
        <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
          <View style={styles.container}>
            <Text>{markerInfo}</Text>
            <Button title = 'Like' onPress = { () => {changeFavorite(currentShop, setShops)}}/>
          </View>
        </Modal>
        <Button title = 'only favorite' onPress = { () => {onlyFavorite(props.markers, setShops, setIsOnlyFavorite)}}/>
        <Button title = 'show all' onPress = { () => {showAll(props.markers, setShops, setIsOnlyFavorite)}}/>
    </View>
  ) 
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 1,
  },
  searchBox: {
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: '#000',
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
  }
});

export default Map;