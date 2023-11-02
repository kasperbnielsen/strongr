import { Collection, MongoClient } from 'mongodb';

import { ExerciseEntity, UserEntity, WorkoutEntity } from '../types';

export const { DATABASE_URI } = process.env;

if (!DATABASE_URI?.length) throw new Error('Missing DATABASE_URI env');

export const { DATABASE_NAME } = process.env;

if (!DATABASE_NAME?.length) throw new Error('Missing DATABASE_NAME env');

const databaseClient = new MongoClient(DATABASE_URI);

const databaseConnection = databaseClient.connect();

export async function getCollection(collectionName: 'users'): Promise<Collection<UserEntity>>;

export async function getCollection(collectionName: 'workouts'): Promise<Collection<WorkoutEntity>>;

export async function getCollection(collectionName: 'exercises'): Promise<Collection<ExerciseEntity>>;

export async function getCollection(collectionName: string) {
  const conn = await databaseConnection;

  const db = conn.db(DATABASE_NAME);

  switch (collectionName) {
    case 'workouts':
      return db.collection<WorkoutEntity>(collectionName);

    case 'exercises':
      return db.collection<ExerciseEntity>(collectionName);

    case 'users':
      return db.collection<UserEntity>(collectionName);

    default:
      return db.collection(collectionName);
  }
}
