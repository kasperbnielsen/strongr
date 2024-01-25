import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosResponse } from 'axios';

import { API_BASE_URL } from '..';
import { UserModel } from '../../types';

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

export async function RefreshToken(refreshToken: string): Promise<{ token: string; refreshToken: string }> {
  const userid = await AsyncStorage.getItem('userid');
  const token = await axios
    .post(`${API_BASE_URL}/refresh`, {
      refreshToken,
      userid,
    })
    .then((result: AxiosResponse<{ token: string; refreshToken: string }>) => result.data);

  return token;
}
