import axios from 'axios';

import { API_BASE_URL, responseAxios } from '../';
import { ExerciseModel } from '../../types';

export async function getExercises() {
  return axios.get(`${API_BASE_URL}/exercises`).then(responseAxios<ExerciseModel[]>);
}

export async function getExercise(id: string) {
  return axios.get(`${API_BASE_URL}/exercises/${id}`).then(responseAxios<ExerciseModel>);
}

export async function createExercise(entity: ExerciseModel) {
  await axios.post(`${API_BASE_URL}/exercises`, {
    title: entity.title,
    description: entity.description,
    exercise_type: entity.exercise_type,
  });
}
