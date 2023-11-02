import { API_BASE_URL } from "..";
import { WorkoutEntity } from "../../types";

export async function getWorkout(workoutId: string) {
  return fetch(API_BASE_URL + "/workouts/" + workoutId).then(
    (res): Promise<WorkoutEntity> => res.json(),
  );
}

export async function getWorkouts(userId: string) {
  return fetch(API_BASE_URL + "/users/" + userId + "/workouts").then(
    (res): Promise<WorkoutEntity[]> => res.json(),
  );
}
