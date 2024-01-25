import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosError } from 'axios';

import 'expo-router/entry';
import { RefreshToken } from './endpoints/authentication';

axios.interceptors.request.use(
  async function (config) {
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
    if (error.response.status === 418) {
      const refreshToken = await AsyncStorage.getItem('refresh');

      console.log(refreshToken);

      const data = await RefreshToken(refreshToken);

      console.log(data);

      await AsyncStorage.setItem('token', data.token);

      await AsyncStorage.setItem('refresh', data.refreshToken);
    }

    return Promise.resolve(error);
  }
);
