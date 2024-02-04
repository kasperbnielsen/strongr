import { Button, FlatList, Pressable, Text, View, Image } from 'react-native';

import WorkoutSetInput from './WorkoutSetInput';
import { ExerciseModel, SetType, WorkoutModelExercise, WorkoutModelExerciseSet } from '../../types';

export default function WorkoutExerciseInput({
  workoutExercise,
  exercise,
  update,
  remove,
}: {
  workoutExercise: WorkoutModelExercise;
  exercise: ExerciseModel;
  update: (item: WorkoutModelExercise) => void;
  remove: () => void;
}) {
  function addSet() {
    const set: WorkoutModelExerciseSet = {
      weight: 0,
      reps: 0,
      set_type: SetType.Default,
      ...(workoutExercise?.sets[workoutExercise.sets.length - 1] ?? {}),
      time: 0,
    };

    update({ ...workoutExercise, sets: [...workoutExercise.sets, set] });
  }

  function updateSet(set: WorkoutModelExerciseSet, index: number) {
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
    <View style={{ gap: 4 }}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Text style={{ width: '90%' }}>{exercise?.title}</Text>
        <Pressable onPress={remove}>
          <Image source={{ uri: '../../assets/delete.svg' }} style={{ width: 20, height: 24 }} />
        </Pressable>
      </View>

      <FlatList
        data={workoutExercise?.sets ?? []}
        renderItem={({ item, index }) => (
          <WorkoutSetInput
            index={index}
            exerciseType={exercise?.exercise_type}
            set={item}
            updateSet={(set) => updateSet(set, index)}
            deleteSet={() => deleteSet(index)}
          />
        )}
        keyExtractor={(_, index) => index.toString()}
      />

      <Pressable
        style={{ backgroundColor: 'green', width: '20%', marginTop: 32, alignSelf: 'center' }}
        onPress={addSet}
      >
        <Text style={{ alignSelf: 'center' }}>Add Set</Text>
      </Pressable>
    </View>
  );
}
