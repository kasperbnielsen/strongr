import axios, { HttpStatusCode } from 'axios';

import { API_BASE_URL } from '..';

export async function signUp(email: string, password: string): Promise<HttpStatusCode> {
  return await axios.post(`${API_BASE_URL}/users`, {
    first_name: '',
    last_name: '',
    email,
    password,
  });
}
