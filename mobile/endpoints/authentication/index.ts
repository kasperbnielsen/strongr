import axios, { AxiosResponse } from 'axios';
import { API_BASE_URL } from '..';
import { UserModel } from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function AuthenticateCredentials(email: string, password: string): Promise<AxiosResponse<UserModel, any>> {
  return await axios.post(`${API_BASE_URL}/auth`, {
    email,
    password,
  });
}

export async function AuthenticateSession(jwtToken: string) {
  const response = axios.post(`${API_BASE_URL}/sesssionauth`, {
    jwtToken,
  });

  return await response;
}

export async function RefreshToken(refreshToken: string): Promise<string> {
  const userid = await AsyncStorage.getItem('userid');
  return await axios.post(`${API_BASE_URL}/refresh`, {
    refresh: [refreshToken, userid],
  });
}
