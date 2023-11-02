import { Text, View } from 'react-native';

import { WorkoutEntity } from '../../types';

export default function WorkoutListItem({ workout }: { workout: WorkoutEntity }) {
  return (
    <View>
      <Text>{workout.title}</Text>
    </View>
  );
}
