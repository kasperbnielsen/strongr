import { Button, FlatList, Pressable, Text, View } from 'react-native';

import WorkoutSetInput from './WorkoutSetInput';
import { ExerciseEntity, SetType, WorkoutEntityExercise, WorkoutEntityExerciseSet } from '../../types';

export default function WorkoutExerciseInput({
  workoutExercise,
  exercise,
  update,
  remove,
}: {
  workoutExercise: WorkoutEntityExercise;
  exercise: ExerciseEntity;
  update: (item: WorkoutEntityExercise) => void;
  remove: () => void;
}) {
  function addSet() {
    const set: WorkoutEntityExerciseSet = {
      weight: 0,
      reps: 0,
      set_type: SetType.Default,
      ...(workoutExercise?.sets[workoutExercise.sets.length - 1] ?? {}),
      finished: false,
      time: 0,
    };

    update({ ...workoutExercise, sets: [...workoutExercise.sets, set] });
  }

  function updateSet(set: WorkoutEntityExerciseSet, index: number) {
    const clone = workoutExercise.sets.slice();

    // TODO: do this in a performant way
    clone.splice(index, 1, set);

    update({ ...workoutExercise, sets: clone });
  }

  function deleteSet(index: number) {
    const clone = workoutExercise.sets.slice();

    // TODO: do this in a performant way
    clone.splice(index, 1);

    update({ ...workoutExercise, sets: clone });
  }

  return (
    <View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Text>{exercise.title}</Text>

        <Button onPress={remove} title='🗑️' />
      </View>

      <FlatList
        data={workoutExercise?.sets ?? []}
        renderItem={({ item, index }) => (
          <WorkoutSetInput
            index={index}
            exerciseType={exercise.exercise_type}
            set={item}
            updateSet={(set) => updateSet(set, index)}
            deleteSet={() => deleteSet(index)}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
      />

      <Pressable style={{ backgroundColor: 'green', width: '100%', marginTop: 32 }} onPress={addSet}>
        <Text>Add Set</Text>
      </Pressable>
    </View>
  );
}
