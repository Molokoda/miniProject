import React, {useState, useEffect} from 'react';
import {  View, StyleSheet, Button, TextInput, Text, TouchableOpacity } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import darkMap from './darkStyle';
const Geofence = require('react-native-expo-geofence');

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

function backdropPress(index: number, setIndex: any, nearshop: any, setModalVisible: any){
  if(index < nearshop.length){
    setIndex(index + 1);
  }
  setModalVisible(false);
}

type Props = {
  markers: any,
  isDark: boolean,
  theme: any,
  coords: any,
  distance: any
}

const Map: React.FC<Props> = (props) => {
  const [shops, setShops] = useState(props.markers);
  const [isOnlyFavorite, setIsOnlyFavorite] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [markerInfo, setMarkerInfo] = useState('');
  const [currentShop, setCurrentShop] = useState( {name: String, shopType: String, favorite: Boolean} );
  const [nearShops, setNearShops] = useState([{name: String, shopType: String, favorite: Boolean}]);
  const [oldDistance, setOldDistance] = useState(2);
  const [shopIndex, setShopIndex] = useState(0);
  useEffect( () => {
    if( Number(oldDistance) !== Number(props.distance) ){
      let points = shops.map( (shop: any) => { return {latitude:  shop.latitude, longitude: shop.longitude} } );
      let startPoint = {latitude: props.coords.coords.latitude, longitude: props.coords.coords.longitude};
      let result = Geofence.default.filterByProximity(startPoint, points, Number(props.distance) );
      let findShops;
      if( result.length > 0 ){
        findShops = result.map( (nearShop: any) => {
          return shops.find( (shop: any) =>  {
            if(shop.latitude === nearShop.latitude && shop.longitude === nearShop.longitude){
              return shop
            }
          } )
        })
        setNearShops(findShops)
        setShopIndex(0);

      }
      else{
        alert('There is no shop in this distance');
      }
      setOldDistance(props.distance);
    }
    if(shopIndex < nearShops.length){
      setModalVisible(true);
      setMarkerInfo(`${nearShops[shopIndex].name}, ${nearShops[shopIndex].shopType}`);
      setCurrentShop(nearShops[shopIndex]);
    }
  })

  return(
    <View style = {styles.map}>
        <MapView 
          style = {styles.map} 
          customMapStyle = {props.isDark ? darkMap: []} 
          initialRegion = {  { latitude: props.coords.coords.latitude, longitude: props.coords.coords.longitude, latitudeDelta: 0.015, longitudeDelta: 0.0121 } } 
        >
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
                  title = {shop.name}
                  key = {String(index)} 
                  coordinate = { {latitude: Number(shop.latitude), longitude: Number(shop.longitude)} } 
                  image = { type }
                  onPress = { () => {showMarkerInfo(setModalVisible, setMarkerInfo, shop, setCurrentShop)}}
                />
               ) 
            } ) } 
        </MapView >
        <View style = { [styles.searchBox, {backgroundColor: props.theme.backgroundColor}]}>
          <TextInput 
            placeholder = {'Enter shop name'} 
            style = { {color: props.theme.color} }
            placeholderTextColor = {props.theme.placeholderColor}
            autoCapitalize = 'none'
            onChangeText = {(event: any) =>  filterShops(event, props.markers, setShops, isOnlyFavorite)}
          />

        </View>
        <Modal isVisible={isModalVisible} onBackdropPress={() => backdropPress(shopIndex, setShopIndex, nearShops, setModalVisible)}>
          <View style={styles.container}>
            <Text style = { {color: 'white'} }>{markerInfo}</Text>
            <TouchableOpacity
                style={styles.button}
                onPress = { () => {changeFavorite(currentShop, setShops)}}
            >
                <Text>{ currentShop.favorite ? 'Unlike' : 'Like'}</Text>
            </TouchableOpacity>
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
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#ccc',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 10,
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

export default Map;