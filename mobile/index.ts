import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { HttpStatusCode } from 'axios';
import 'expo-router/entry';
import { RefreshToken } from './endpoints/authentication';

axios.interceptors.request.use(
  async function (config) {
    const bearerToken = await AsyncStorage.getItem('token');
    if (bearerToken) {
      config.headers.Authorization = `Bearer ${bearerToken}`;
    }

    return config;
  },
  async function (error) {
    // Do something with request error
    if (error === HttpStatusCode.ImATeapot) {
      const refreshToken = await AsyncStorage.getItem('refresh');

      await AsyncStorage.setItem('refresh', await RefreshToken(refreshToken));
    }

    return Promise.reject(error);
  }
);
