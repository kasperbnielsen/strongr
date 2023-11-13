import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { API_BASE_URL } from '../';
import { ExerciseEntity } from '../../types';

export async function getExercises() {
  return fetch(`${API_BASE_URL}/exercises`).then((res): Promise<ExerciseEntity[]> => res.json());
}

export async function createExercise(entity: ExerciseEntity) {
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
