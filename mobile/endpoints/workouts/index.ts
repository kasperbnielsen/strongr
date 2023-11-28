import { API_BASE_URL } from '../';
import { WorkoutModel } from '../../types';

export async function getWorkout(workoutId: string) {
  return fetch(`${API_BASE_URL}/workouts/${workoutId}`).then((res): Promise<WorkoutModel> => res.json());
}

export async function getWorkouts(userId: string) {
  return fetch(`${API_BASE_URL}/users/${userId}/workouts`).then((res): Promise<WorkoutModel[]> => res.json());
}

export async function createWorkout(input: Omit<WorkoutModel, '_id'>, token: string) {
  return fetch(`${API_BASE_URL}/workouts`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(input),
  });
}
