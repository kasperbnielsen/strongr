import { AxiosResponse } from 'axios';

export const API_BASE_URL = 'http://localhost:3000';

export const responseAxios = <T>({ data }: AxiosResponse<T>): T => data;
