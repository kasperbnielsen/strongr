import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError } from 'axios';

import 'expo-router/entry';
import { RefreshToken } from './endpoints/authentication';

axios.interceptors.request.use(
  async function (config) {
    console.log('Im here 1');
    const bearerToken = await AsyncStorage.getItem('token');
    if (bearerToken) {
      config.headers.Authorization = `Bearer ${bearerToken}`;
    }

    return config;
  } // Do something with request error
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error: AxiosError) {
    console.log('im here 2');
    if (error.response.status === 418) {
      console.log('hello');
      const refreshToken = await AsyncStorage.getItem('refresh');

      await AsyncStorage.setItem('refresh', await RefreshToken(refreshToken));
    }

    return Promise.reject(error);
  }
);
