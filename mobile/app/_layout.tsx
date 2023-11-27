import AsyncStorage from '@react-native-async-storage/async-storage';
import { Slot } from 'expo-router';
import { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';

import LoginPage from './auth/login';
import BottomNavBar from '../components/navbar/BottomNavBar';
const image = { uri: '../../assets/desktop-bg.svg' };

export default function HomeLayout() {
  const [token, setToken] = useState('');

  const getData = async () => {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      setToken(value);
    }
  };

  useEffect(() => {
    getData();
  });

  if (token === '123') {
    return (
      <>
        <Slot />
        <BottomNavBar />
      </>
    );
  } else {
    return (
      <ImageBackground style={{ height: '100%' }} source={image} resizeMode='cover'>
        <LoginPage />
      </ImageBackground>
    );
  }
}
