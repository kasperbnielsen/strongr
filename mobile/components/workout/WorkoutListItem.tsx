import { Text, View } from 'react-native';

import { WorkoutModel } from '../../types';

export default function WorkoutListItem({ workout }: { workout: WorkoutModel }) {
  return (
    <View>
      <Text>{workout.title}</Text>
    </View>
  );
}
