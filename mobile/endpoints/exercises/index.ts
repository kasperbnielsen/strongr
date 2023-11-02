import { API_BASE_URL } from "..";
import { ExerciseEntity } from "../../types";

export async function getExercises() {
  return fetch(API_BASE_URL + "/exercises").then(
    (res): Promise<ExerciseEntity[]> => res.json(),
  );
}
