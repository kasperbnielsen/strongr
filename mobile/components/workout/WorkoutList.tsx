import { FlatList } from 'react-native';

import WorkoutListItem from './WorkoutListItem';
import { WorkoutModel } from '../../types';

export default function WorkoutList({ workouts }: { workouts: WorkoutModel[] }) {
  return (
    <FlatList
      data={workouts}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => <WorkoutListItem workout={item} />}
    />
  );
}
