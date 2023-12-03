import axios from 'axios';

import { API_BASE_URL, responseAxios } from '../';
import { WorkoutModel } from '../../types';

export async function getWorkout(workoutId: string) {
  return axios.get(`${API_BASE_URL}/workouts/${workoutId}`).then(responseAxios<WorkoutModel>);
}

export async function getWorkouts(userId: string) {
  return axios.get(`${API_BASE_URL}/users/${userId}/workouts`).then(responseAxios<WorkoutModel[]>);
}

export async function createWorkout(input: Omit<WorkoutModel, '_id'>) {
  return axios.post(`${API_BASE_URL}/workouts`, JSON.parse(JSON.stringify(input)));
}
