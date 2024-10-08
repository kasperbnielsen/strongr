import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import Modal from 'react-native-modal';

import WorkoutExerciseInput from './WorkoutExerciseInput';
import WorkoutNoteInput from './WorkoutNoteInput';
import WorkoutTitleInput from './WorkoutTitleInput';
import { UseDispatch } from '../../app/state';
import { getExercises, getPrevious } from '../../endpoints/exercises';
import { createWorkout } from '../../endpoints/workouts';
import {
  ExerciseModel,
  PreviousExercises,
  Routines,
  SetType,
  WorkoutModel,
  WorkoutModelExercise,
  WorkoutModelExerciseSet,
  WorkoutModelOutput,
} from '../../types';
import ExerciseInputModal from '../exercise/ExerciseInputModal';
import NewExercise from '../exercise/NewExercise';
import Timer from '../stopwatch/Timer';

function generateWorkoutTitle() {
  const localHour = new Date().getHours();

  if (localHour < 11) return 'Morning Workout';

  if (localHour < 13) return 'Midday Workout';

  return 'Workout';
}

export default function WorkoutModal({
  visible,
  close,
  workouts,
  getSavedWorkout,
  isRoutine,
}: {
  visible: boolean;
  close: () => void;
  workouts: WorkoutModelOutput | null;
  getSavedWorkout: (workout: Routines) => void;
  isRoutine: boolean;
}) {
  // TODO: move to global state
  const [exercises, setExercises] = useState<ExerciseModel[]>([]);

  const [title, setTitle] = useState(generateWorkoutTitle());

  const [note, setNote] = useState('');

  const [startedAt, setStartedAt] = useState(new Date());

  const [userId, setUserId] = useState<string>();

  const [showExercise, setShowExercise] = useState(false);

  const [exerciseHistory, setExerciseHistory] = useState<PreviousExercises[]>([]);

  const [previous, setPrevious] = useState<any[]>([]);

  const dispatcher = new UseDispatch();

  const [workoutExercises, setWorkoutExercises] = useState<WorkoutModel['exercises']>([]);
  const getData = async () => {
    const value = await AsyncStorage.getItem('userid');
    if (value !== null) {
      setUserId(value);
    }
  };

  async function getPreviousExerciseData() {
    return await getPrevious(userId);
  }

  useEffect(() => {
    getData();
    if (isRoutine) {
      setTitle(workouts.title);
      setNote(workouts.note);
      setWorkoutExercises(workouts.exercises);
      setStartedAt(workouts.started_at);
    } else if (workouts !== null) {
      const data: { title: string; note: string; exercises: WorkoutModelExercise[]; started_at: Date } = workouts;
      setTitle(data.title);
      setNote(data.note);
      setWorkoutExercises(data.exercises ?? []);
      setStartedAt(data.started_at);
    } else {
      setTitle(generateWorkoutTitle());
      setNote('');
      setWorkoutExercises([]);
      setStartedAt(new Date());
    }
    getExercises().then(setExercises);
  }, [dispatcher.getState().workouts, workouts]);

  useEffect(() => {
    getPreviousExerciseData().then(setExerciseHistory);
  }, [userId]);

  useEffect(() => {
    if (workoutExercises.length !== 0 && exerciseHistory !== undefined) {
      const find = exerciseHistory.find((val) => val._id.$oid === workoutExercises.at(-1).exercise_id.$oid);

      if (find === undefined)
        setPrevious([
          ...previous,
          {
            sets: [
              { weight: 0, time: 0 },
              { weight: 0, time: 0 },
              { weight: 0, time: 0 },
            ],
          },
        ]);
      else setPrevious([...previous, find]);
    }
  }, [workoutExercises.length]);

  async function save() {
    if (!workoutExercises.length) return;
    const trimmedTitle = title?.trim() ?? '';

    if (!trimmedTitle.length) return;

    await createWorkout({
      title: trimmedTitle,
      note: note?.trim() ?? '',
      user_id: userId,
      started_at: startedAt,
      finished_at: new Date(),
      exercises: workoutExercises,
    });

    const exerciseIdList: Routines = { user_id: userId, title: trimmedTitle, exercises: [] };

    workoutExercises.forEach((exercise) => {
      exerciseIdList.exercises.push({
        title: exercises.find((val) => val._id.$oid === exercise.exercise_id.$oid).title,
        exercise_id: exercise.exercise_id.$oid,
      });
    });
    getSavedWorkout(exerciseIdList);

    dispatcher.tryDispatch(2, null);
    setTitle(generateWorkoutTitle());
    setNote('');
    setWorkoutExercises([]);
    setStartedAt(new Date());

    close();
  }

  function cancelWorkout() {
    close();
    dispatcher.tryDispatch(2, null);
  }

  function closeModal() {
    dispatcher.tryDispatch(2, {
      title: title?.trim() ?? '',
      note: note?.trim() ?? '',
      exercises: workoutExercises,
      started_at: startedAt,
    });

    close();
  }

  function removeExercise(index: number) {
    const clone = workoutExercises.slice();
    clone.splice(index, 1);
    setWorkoutExercises(clone);
  }

  function updateExercise(index: number, e: WorkoutModelExercise) {
    const clone = workoutExercises.slice();
    clone.splice(index, 1, e);
    setWorkoutExercises(clone);
  }

  function addExercise(exercise: ExerciseModel) {
    const set: WorkoutModelExerciseSet = { set_type: SetType.DropSet, time: 0, weight: 0, reps: 0 };

    setWorkoutExercises([
      ...workoutExercises,
      { exercise_id: exercise._id, note: '', sets: [{ ...set }, { ...set }, { ...set }] },
    ]);

    setShowExerciseModal(false);
  }

  const [showExerciseModal, setShowExerciseModal] = useState(false);

  return (
    <Modal
      isVisible={visible}
      onSwipeComplete={() => {
        closeModal();
      }}
      swipeDirection='down'
      style={{ backgroundColor: 'white', height: '100%', padding: 24, paddingTop: 12 }}
    >
      <View
        style={{
          borderStyle: 'solid',
          borderWidth: 2,
          borderColor: 'black',
          top: 0,
          width: '100%',
          margin: 6,
          alignSelf: 'center',
          borderRadius: 10,
        }}
      />

      <View style={{ flex: -1, flexDirection: 'row', width: '100%', height: '10%' }}>
        <View style={{ width: '50%', paddingVertical: 12 }}>
          <Pressable
            onPress={cancelWorkout}
            style={{
              backgroundColor: 'red',
              paddingVertical: 4,
              borderRadius: 4,
              paddingHorizontal: 12,
              alignSelf: 'flex-start',
            }}
          >
            <Text style={{ color: 'white', fontWeight: '400', alignSelf: 'center' }}> Cancel</Text>
          </Pressable>
        </View>
        <View style={{ width: '50%', paddingVertical: 12 }}>
          <Pressable
            disabled={workoutExercises.length === 0}
            onPress={save}
            style={{
              backgroundColor: 'green',
              paddingVertical: 4,
              borderRadius: 4,
              paddingHorizontal: 12,
              alignSelf: 'flex-end',
            }}
          >
            <Text style={{ color: 'white', fontWeight: '400', alignSelf: 'center' }}>Save</Text>
          </Pressable>
        </View>
      </View>

      <View style={{ height: '20%' }}>
        <WorkoutTitleInput title={title} setTitle={setTitle} />
        <Timer startTime={startedAt} />
        <WorkoutNoteInput note={note} setNote={setNote} />
      </View>

      <View style={{ flex: 1, height: '70%' }}>
        {workoutExercises?.length ? (
          <FlatList
            data={workoutExercises}
            renderItem={({ item, index }) => (
              <WorkoutExerciseInput
                previous={previous[index]}
                workoutExercise={item}
                remove={() => removeExercise(index)}
                exercise={exercises.find((e) => e._id.$oid === item.exercise_id.$oid)}
                update={(item) => updateExercise(index, item)}
              />
            )}
          />
        ) : (
          <></>
        )}
        <Pressable
          onPress={() => setShowExerciseModal(true)}
          style={{ backgroundColor: 'green', width: '100%', alignSelf: 'center', marginTop: 32 }}
        >
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, padding: 4 }}>Add exercise</Text>
        </Pressable>
      </View>

      <NewExercise visible={showExercise} close={() => {}} />

      <ExerciseInputModal
        visible={showExerciseModal}
        exercises={exercises}
        close={() => setShowExerciseModal(false)}
        addExercise={addExercise}
      />
    </Modal>
  );
}
