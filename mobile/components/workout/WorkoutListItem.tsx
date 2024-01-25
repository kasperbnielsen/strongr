import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { ExerciseModel, WorkoutModel } from '../../types';
import { useEffect, useState } from 'react';
import { getExercise } from '../../endpoints/exercises';

export default function WorkoutListItem({ workout }: { workout: WorkoutModel }) {
  const [exerciseId, setExerciseId] = useState<string[]>([]);
  async function getExerciseName() {
    const exerciseIds = [];

    workout.exercises.forEach(async (element) => {
      exerciseIds.push((await getExercise(element.exercise_id))._id);
    });

    setExerciseId(exerciseIds);
  }

  useEffect(() => {
    getExerciseName();
  }, []);

  return (
    <View style={{ backgroundColor: 'blue', marginVertical: 8, width: '100%', borderRadius: 5 }}>
      <View style={{ margin: 10 }}>
        <Text>{workout.title}</Text>
        <Text>{exerciseId[0]}</Text>
      </View>
      <Text>{workout.note}</Text>
    </View>
  );
}
