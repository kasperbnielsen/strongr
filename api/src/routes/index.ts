import { Router } from 'express';
import { ObjectId } from 'mongodb';

import { getCollection } from '../database';

export const router = Router();

router.post('/users', async (req, res) => {
  const userCollection = await getCollection('users');

  const insertResult = await userCollection.insertOne({
    first_name: req?.body?.first_name?.trim() || '',
    last_name: req?.body?.last_name?.trim() || '',
  });

  res.status(201).send(insertResult);
});

router.get('/users/:user_id', async (req, res) => {
  const userCollection = await getCollection('users');

  if (!ObjectId.isValid(req.params.user_id)) {
    res.status(400).send({ error: 'Invalid user_id' });
    return;
  }

  const user = await userCollection.findOne({
    _id: ObjectId.createFromHexString(req.params.user_id),
  });

  if (user) {
    res.status(200).send(user);
    return;
  }

  res.status(404).send({ error: 'User not found' });
});

router.post('/workouts', async (req, res) => {
  const userId = req?.body?.user_id;

  if (!userId || !ObjectId.isValid(userId)) {
    res.status(400).send({ error: 'Invalid user_id' });
    return;
  }

  const { exercises } = req?.body?.exercises;

  if (!Array.isArray(exercises) || !exercises?.length) {
    res.status(400).send({ error: 'Invalid exercises input' });
    return;
  }

  const workoutCollection = await getCollection('workouts');

  const insertResult = await workoutCollection.insertOne({
    user_id: ObjectId.createFromHexString(req.body.user_id),
    title: req.body.title?.trim() || 'Workout',
    note: req?.body?.note?.trim() ?? '',
    exercises: exercises || [],
    started_at: req?.body?.started_at,
    finished_at: new Date(),
  });

  res.status(201).send(insertResult);
});

router.get('/workouts/:workout_id', async (req, res) => {
  if (!ObjectId.isValid(req.params.workout_id)) {
    res.status(400).send({ error: 'Invalid workout id' });
    return;
  }

  const workoutCollection = await getCollection('workouts');

  const workout = await workoutCollection.findOne({
    _id: ObjectId.createFromHexString(req.params.workout_id),
  });

  if (workout) {
    res.status(200).send(workout);
    return;
  }

  res.status(404).send({ error: 'Workout not found' });
});

router.get('/users/:user_id/workouts', async (req, res) => {
  const workoutCollection = await getCollection('workouts');

  const workouts = await workoutCollection
    .find({ user_id: ObjectId.createFromHexString(req.params.user_id) })
    .toArray();

  res.status(200).send(workouts);
});
