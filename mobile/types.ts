export type UserEntity = {
  _id: string;
  first_name: string;
  last_name: string;
};

export enum ExerciseType {
  Weight = 0,
  Time = 1,
}

export type ExerciseEntity = {
  _id: string;
  title: string;
  description: string;
  exercise_type: ExerciseType;
};

export enum SetType {
  Default = 0,
  WarmUp = 1,
  DropSet = 2,
  Failure = 3,
}

export type WorkoutEntityExerciseSet = {
  finished: boolean;
  set_type: SetType;

  weight: number;
  reps: number;
  // Time in seconds
  time: number;
};

export type WorkoutEntityExercise = {
  exercise_id: string;
  note: string;
  sets: WorkoutEntityExerciseSet[];
};

export type WorkoutEntity = {
  _id: string;
  user_id: string;
  title: string;
  note: string;
  exercises: WorkoutEntityExercise[];
  started_at: Date;
  finished_at: Date;
};
