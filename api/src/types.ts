import { ObjectId } from 'mongodb';

export type UserEntity = {
  first_name: string;
  last_name: string;
};

export enum ExerciseType {
  Weight = 0,
  Time = 1,
}

export type ExerciseEntity = {
  title: string;
  description: string;
  exercise_type: ExerciseType;
};

export type WorkoutEntityExerciseSetWeight = {
  weight?: number;
  reps: number;
};

export type WorkoutEntityExerciseSetTime = {
  // Time in seconds
  time: number;
};

export enum SetType {
  Default = 0,
  WarmUp = 1,
  DropSet = 2,
  Failure = 3,
}

export type WorkoutEntityExerciseBaseSet = {
  set_type: SetType;
};

export type WorkoutEntityExerciseSet = (
  | WorkoutEntityExerciseSetTime
  | WorkoutEntityExerciseSetWeight
) &
  WorkoutEntityExerciseBaseSet;

export type WorkoutEntityExercise = {
  exercise_id: ObjectId;
  note: string;
  sets: WorkoutEntityExerciseSet[];
};

export type WorkoutEntity = {
  user_id: ObjectId;
  title: string;
  note: string;
  exercises: WorkoutEntityExercise[];
  started_at: Date;
  finished_at: Date;
};
