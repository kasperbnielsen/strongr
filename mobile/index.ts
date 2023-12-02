import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import 'expo-router/entry';

axios.interceptors.request.use(
  async function (config) {
    const bearerToken = await AsyncStorage.getItem('token');
    if (bearerToken) {
      config.headers.Authorization = `Bearer ${bearerToken}`;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
