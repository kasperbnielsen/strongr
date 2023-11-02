import { FlatList } from 'react-native';

import WorkoutListItem from './WorkoutListItem';
import { WorkoutEntity } from '../../types';

export default function WorkoutList({ workouts }: { workouts: WorkoutEntity[] }) {
  return (
    <FlatList
      data={workouts}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <WorkoutListItem workout={item} />}
    />
  );
}
