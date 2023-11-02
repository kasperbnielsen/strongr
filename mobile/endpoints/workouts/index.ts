import { API_BASE_URL } from '../';
import { WorkoutEntity } from '../../types';

export async function getWorkout(workoutId: string) {
  return fetch(`${API_BASE_URL}/workouts/${workoutId}`).then((res): Promise<WorkoutEntity> => res.json());
}

export async function getWorkouts(userId: string) {
  return fetch(`${API_BASE_URL}/users/${userId}/workouts`).then((res): Promise<WorkoutEntity[]> => res.json());
}

export async function createWorkout(input: Omit<WorkoutEntity, '_id'>) {
  return fetch(`${API_BASE_URL}/workouts`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(input),
  });
}
