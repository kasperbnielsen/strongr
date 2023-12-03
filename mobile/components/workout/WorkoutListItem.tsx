import { Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { WorkoutModel } from '../../types';

export default function WorkoutListItem({ workout }: { workout: WorkoutModel }) {
  return (
    <View>
      <Text>{workout.title}</Text>
      <FlatList
        data={workout.exercises}
        renderItem={({ item }) => (
          <View>
            <Text>{item.note}</Text>
            <FlatList
              style={{ paddingBottom: 20 }}
              data={item.sets}
              renderItem={({ item }) => (
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <Text style={{ paddingRight: 5 }}>{item.weight}</Text>
                  <Text style={{ paddingRight: 5 }}>x</Text>
                  <Text>{item.reps}kg</Text>
                </View>
              )}
            />
          </View>
        )}
      />
    </View>
  );
}
