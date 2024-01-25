import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { getExercise } from '../../endpoints/exercises';
import { ExerciseModel, WorkoutModel } from '../../types';

export default function WorkoutListItem({ workout }: { workout: WorkoutModel }) {
  const [exerciseId, setExerciseId] = useState<string[]>([]);
  async function getExerciseName() {
    const exerciseIds = [];

    workout.exercises.forEach(async (element) => {
      exerciseIds.push((await getExercise(element.exercise_id.$oid)).title);
    });

    return exerciseIds;
  }

  useEffect(() => {
    getExerciseName().then(setExerciseId);
  }, []);

  return (
    <View style={{ backgroundColor: 'blue', marginVertical: 8, width: '100%', borderRadius: 5 }}>
      <View style={{ margin: 10, gap: 10 }}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text style={{ width: '75%' }}>{workout.title}</Text>
          <Text style={{ width: '25%' }}>asd</Text>
        </View>
        <FlatList data={exerciseId} keyExtractor={(item) => item} renderItem={({ item }) => <Text>{item}</Text>} />
      </View>
      <Text>{workout.note}</Text>
    </View>
  );
}
