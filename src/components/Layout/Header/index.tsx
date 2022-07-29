import React, {useEffect, useMemo, useState} from 'react';

import auth from '@react-native-firebase/auth';

import { PermissionsAndroid, DevSettings } from 'react-native'

import { LogoutButton } from '@components/Controllers/LogoutButton';
import { Container, Greeting, Title, SubTitle } from './styles';

import Geolocation from 'react-native-geolocation-service';


const keyWeather = {
  apiKey: 'c100d13e97ab9352fb68f0b8026e6bbf',
}

export function Header() {

  const [state, setState] = useState({
    lat: 0,
    lon: 0,
    data: {}
  })

  const [weather, setWeather] = useState(0)

  useEffect(()=> {
    getLocation()
  },[]);

  const getLocation = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
      
    if(granted == PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
            (position) => {
              setState({
                lat: position.coords.latitude,
                lon: position.coords.longitude,
                data: {}
              })
              getWeather(position.coords.latitude, position.coords.longitude)
            },
            (error) => {
              // See error code charts below.
              console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }

  }


  const getWeather = async (lat:any, lon:any) => {
    if(state.lat != 0 ) {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${state.lat}&lon=${state.lon}&appid=${keyWeather.apiKey}`)
      const data = await response.json();
      console.log(data)
      setState({
        lat: lat,
        lon: lon,
        data: data
      })
      setWeather(Math.floor(data.main.temp - 274.15))
      //console.log('baawa',now.getMonth() )
    }
  }

 
  function handleSignOut() {
    auth().signOut();
  }

  const now = new Date(Date.now());
  var outraData = new Date();
  outraData.setHours(now.getHours() - 3);

  const dayName = new Array ("Domingo", "Segunda", "terça", "Quarta", "Quinta", "Sexta", "Sábado")
  const monName = new Array ("janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "outubro", "novembro", "dezembro")

  const dataFormatada = dayName[outraData.getDay()] + ", " + outraData.getDate() + " de " +  monName[outraData.getMonth()] +" de "  + outraData.getFullYear()

  return (
    <Container>
      <Greeting>
        <Title>MurinhoApp</Title>
        <SubTitle>{dataFormatada} - {weather} &#176;C</SubTitle>
        <Title/>
      </Greeting>
      <LogoutButton onPress={handleSignOut} />
    </Container>
  );
}
