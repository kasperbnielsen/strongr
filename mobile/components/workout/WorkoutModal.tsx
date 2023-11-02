import { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';

import SaveWorkoutButton from './SaveWorkoutButton';
import WorkoutExerciseInput from './WorkoutExerciseInput';
import WorkoutNoteInput from './WorkoutNoteInput';
import WorkoutTitleInput from './WorkoutTitleInput';
import { HARDCODED_USER_ID } from '../../dummy';
import { getExercises } from '../../endpoints/exercises';
import { createWorkout } from '../../endpoints/workouts';
import { ExerciseEntity, SetType, WorkoutEntity, WorkoutEntityExercise, WorkoutEntityExerciseSet } from '../../types';
import ExerciseInputModal from '../exercise/ExerciseInputModal';

function generateWorkoutTitle() {
  const localHour = new Date().getHours();

  if (localHour < 11) return 'Morning Workout';

  if (localHour < 13) return 'Midday Workout';

  return 'Workout';
}

export default function WorkoutModal() {
  // TODO: move to global state
  const [exercises, setExercises] = useState<ExerciseEntity[]>([]);

  const [title, setTitle] = useState(generateWorkoutTitle());

  const [note, setNote] = useState('');

  const [startedAt] = useState(new Date());

  const [workoutExercises, setWorkoutExercises] = useState<WorkoutEntity['exercises']>([]);

  useEffect(() => {
    getExercises().then(setExercises);
  }, []);

  async function save() {
    const trimmedTitle = title?.trim() ?? '';

    if (!trimmedTitle.length) return;

    await createWorkout({
      title: trimmedTitle,
      note: note?.trim() ?? '',
      // TODO: get from global state
      user_id: HARDCODED_USER_ID,
      started_at: startedAt,
      finished_at: new Date(),
      exercises: workoutExercises,
    });
  }

  function removeExercise(index: number) {
    const clone = workoutExercises.slice();
    clone.splice(index, 1);
    setWorkoutExercises(clone);
  }

  function updateExercise(index: number, e: WorkoutEntityExercise) {
    const clone = workoutExercises.slice();
    clone.splice(index, 1, e);
    setWorkoutExercises(clone);
  }

  function addExercise(exercise: ExerciseEntity) {
    const set: WorkoutEntityExerciseSet = { set_type: SetType.Default, time: 0, finished: false, weight: 0, reps: 0 };

    setWorkoutExercises([
      ...workoutExercises,
      { exercise_id: exercise._id, note: '', sets: [{ ...set }, { ...set }, { ...set }] },
    ]);

    setShowExerciseModal(false);
  }

  const [showExerciseModal, setShowExerciseModal] = useState(false);

  return (
    <View>
      <View style={{ flex: 1, flexDirection: 'row', height: 'auto', gap: 10 }}>
        <WorkoutTitleInput title={title} setTitle={setTitle} />

        <SaveWorkoutButton onClick={save} />
      </View>

      <WorkoutNoteInput note={note} setNote={setNote} />

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
        false
      )}

      <Pressable
        onPress={() => setShowExerciseModal(true)}
        style={{ backgroundColor: 'green', width: '100%', marginTop: 32 }}
      >
        <Text style={{ color: 'white', textAlign: 'center', fontSize: 32, padding: 8 }}>Add exercise</Text>
      </Pressable>

      <ExerciseInputModal
        visible={showExerciseModal}
        exercises={exercises}
        close={() => setShowExerciseModal(false)}
        addExercise={addExercise}
      />
    </View>
  );
}
