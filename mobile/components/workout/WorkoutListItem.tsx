import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { getExerciseList } from '../../endpoints/exercises';
import { ExerciseModel, WorkoutModel } from '../../types';

export default function WorkoutListItem({ workout }: { workout: WorkoutModel }) {
  const [names, setNames] = useState<ExerciseModel[]>([]);

  async function getNames() {
    const list = [];
    workout.exercises.forEach((element) => {
      list.push(element.exercise_id.$oid);
    });
    const result = await getExerciseList(list);

    return result;
  }

  useEffect(() => {
    getNames().then(setNames);
  }, []);

  return (
    <View style={{ backgroundColor: 'blue', marginVertical: 8, width: '100%', borderRadius: 5 }}>
      <View style={{ margin: 10, gap: 10 }}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <Text style={{ width: '75%' }}>{workout.title}</Text>
          <Text style={{ width: '25%' }}>asd</Text>
        </View>
        <FlatList
          data={names}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => <Text>{item.title}</Text>}
        />
      </View>
      <Text>{workout.note}</Text>
    </View>
  );
}
