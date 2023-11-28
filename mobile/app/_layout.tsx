import AsyncStorage from '@react-native-async-storage/async-storage';
import { Slot } from 'expo-router';
import { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';

import LoginPage from './auth/login';
import BottomNavBar from '../components/navbar/BottomNavBar';
const image = { uri: '../../assets/desktop-bg.svg' };

export default function HomeLayout() {
  return (
    <>
      <Slot />
      <BottomNavBar />
    </>
  );
}
