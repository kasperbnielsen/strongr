import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { FlatList, Modal, Pressable, Text, View } from 'react-native';

import SaveWorkoutButton from './SaveWorkoutButton';
import WorkoutExerciseInput from './WorkoutExerciseInput';
import WorkoutNoteInput from './WorkoutNoteInput';
import WorkoutTitleInput from './WorkoutTitleInput';
import { getExercises } from '../../endpoints/exercises';
import { createWorkout } from '../../endpoints/workouts';
import { ExerciseModel, SetType, WorkoutModel, WorkoutModelExercise, WorkoutModelExerciseSet } from '../../types';
import ExerciseInputModal from '../exercise/ExerciseInputModal';
import NewExercise from '../exercise/NewExercise';
import { getState } from 'tamagui';
import { UseDispatch } from '../../app/state';
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
}: {
  visible: boolean;
  close: () => void;
  workouts: WorkoutModel | null;
}) {
  // TODO: move to global state
  const [exercises, setExercises] = useState<ExerciseModel[]>([]);

  const [title, setTitle] = useState(generateWorkoutTitle());

  const [note, setNote] = useState('');

  const [startedAt, setStartedAt] = useState(new Date());

  const [userId, setUserId] = useState<string>();

  const [showExercise, setShowExercise] = useState(false);

  const dispatcher = new UseDispatch();

  const [workoutExercises, setWorkoutExercises] = useState<WorkoutModel['exercises']>([]);
  const getData = async () => {
    const value = await AsyncStorage.getItem('userid');
    if (value !== null) {
      setUserId(value);
    }
  };

  useEffect(() => {
    getData();
    if (workouts !== null) {
      const data: { title: string; note: string; exercises: WorkoutModelExercise[]; started_at: Date } = workouts;
      setTitle(data.title);
      setNote(data.note);
      setWorkoutExercises(data.exercises ?? []);
      setStartedAt(data.started_at);
    } else {
      getExercises().then(setExercises);
    }
  }, []);

  async function save() {
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
    <Modal animationType='slide' visible={visible} onRequestClose={close}>
      <View style={{ backgroundColor: '#292727', height: '100%' }}>
        <WorkoutTitleInput title={title} setTitle={setTitle} />
        <WorkoutNoteInput note={note} setNote={setNote} />

        <View style={{ flex: 1 }}>
          {workoutExercises?.length ? (
            <FlatList
              data={workoutExercises}
              renderItem={({ item, index }) => (
                <WorkoutExerciseInput
                  workoutExercise={item}
                  remove={() => removeExercise(index)}
                  exercise={exercises.find((e) => e._id === item.exercise_id)}
                  update={(item) => updateExercise(index, item)}
                />
              )}
            />
          ) : (
            <></>
          )}
          <Pressable
            onPress={() => setShowExerciseModal(true)}
            style={{ backgroundColor: 'green', width: '30%', marginTop: 32, alignSelf: 'center' }}
          >
            <Text style={{ color: 'white', textAlign: 'center', fontSize: 16, padding: 4 }}>Add exercise</Text>
          </Pressable>
        </View>

        <Pressable onPress={() => setShowExercise(true)}>
          <Text>New Exercise</Text>
        </Pressable>
        <NewExercise visible={showExercise} close={() => {}} />

        <SaveWorkoutButton onClick={save} />
        <Pressable onPress={closeModal}>
          <Text>Close</Text>
        </Pressable>

        <ExerciseInputModal
          visible={showExerciseModal}
          exercises={exercises}
          close={() => setShowExerciseModal(false)}
          addExercise={addExercise}
        />
        <Timer startTime={new Date()} />
      </View>
    </Modal>
  );
}
