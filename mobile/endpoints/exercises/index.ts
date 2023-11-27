import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { API_BASE_URL } from '../';
import { ExerciseModel } from '../../types';

export async function getExercises() {
  return fetch(`${API_BASE_URL}/exercises`).then((res): Promise<ExerciseModel[]> => res.json());
}

export async function createExercise(entity: ExerciseModel) {
  fetch(`${API_BASE_URL}/exercises`, {
    method: 'POST',
    body: JSON.stringify({
      title: entity.title,
      description: entity.description,
      exercise_type: entity.exercise_type,
    }),
    headers: { 'Content-Type': 'application/json' },
  });
}
