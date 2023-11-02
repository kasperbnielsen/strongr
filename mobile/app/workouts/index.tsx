import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import WorkoutList from '../../components/workout/WorkoutList';
import { HARDCODED_USER_ID } from '../../dummy';
import { getWorkouts } from '../../endpoints/workouts';
import { WorkoutEntity } from '../../types';

export default function WorkoutOverview() {
  const [workouts, setWorkouts] = useState<WorkoutEntity[]>([]);

  useEffect(() => {
    getWorkouts(HARDCODED_USER_ID).then(setWorkouts);
  }, []);

  return (
    <View>
      <Text>History</Text>

      <WorkoutList workouts={workouts} />
    </View>
  );
}
