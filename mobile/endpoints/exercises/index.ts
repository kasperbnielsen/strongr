import axios from 'axios';

import { API_BASE_URL, responseAxios } from '../';
import { ExerciseModel, PreviousExercises, PreviousExercisesList, WorkoutModelExercise } from '../../types';

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

export async function getExerciseList(ids: string[]) {
  return axios.post(`${API_BASE_URL}/exercises/list`, ids).then(responseAxios<ExerciseModel[]>);
}

export async function getPrevious(user_id: string) {
  return axios.get(`${API_BASE_URL}/previousexercises/${user_id}`).then(responseAxios<PreviousExercises[]>);
}
