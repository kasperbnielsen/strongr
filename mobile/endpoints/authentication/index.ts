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
