import axios from 'axios';
// import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

const api = axios.create({
  baseURL:'https://weather.contrateumdev.com.br/api/'
})
export default function App() {
  const [obj,setObj] = useState({
    city : '',
    state : ''
  })

  const [weather,setWeather] = useState()

  function onChangeText(input,text){
    const cleanText = text.replace(/ /g, '%20');
    setObj((entradaArrow)=>{
      return {
        ...entradaArrow,
        [input]:cleanText
      }
    })
  }


  async function getWeather(){
    const response = await api.get(`weather/city/?city=${obj.city},${obj.state}`)
    console.log(response.data)
    setWeather(response.data)
  }

  return (
    <View style={styles.container}>
      <Text style={{color:'white'}}>Weather!!</Text>
      <TextInput onChangeText={(i)=>onChangeText('city',i)} placeholder='City' style={{borderRadius:15,backgroundColor:'white',width:'50%',height:'5%'}}></TextInput>
      <TextInput onChangeText={(i)=>onChangeText('state',i)} placeholder='State' style={{borderRadius:15,backgroundColor:'white',width:'50%',height:'5%'}}></TextInput>
      <Button title='get weather' onPress={getWeather}></Button>
      <Text style={{color:'white'}}>
        Temperatura: {weather ? weather.main.temp: 'Sem Temperatura'}
        {"\n"}
        Clima: {weather ? weather.weather[0].description: 'Sem Temperatura'}
      </Text>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
