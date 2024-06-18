import axios, { HttpStatusCode } from 'axios';

import { API_BASE_URL, responseAxios } from '..';
import { RoutinesInput } from '../../types';

export async function createRoutine(
  userId: string,
  exercises: { title: string; exercise_id: string }[],
  title: string
): Promise<HttpStatusCode> {
  return await axios.post(`${API_BASE_URL}/routines/${userId}`, { title, exercises });
}

export async function getRoutines(userId: string) {
  return await axios.get(`${API_BASE_URL}/routines/${userId}`).then(responseAxios<RoutinesInput>);
}
