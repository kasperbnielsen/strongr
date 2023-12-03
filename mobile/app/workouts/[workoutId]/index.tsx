import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';

import WorkoutListItem from '../../../components/workout/WorkoutListItem';
import { getWorkouts } from '../../../endpoints/workouts';
import { WorkoutModel } from '../../../types';
import BottomNavBar from '../../../components/navbar/BottomNavBar';

export default function WorkoutPage() {
  const user = useLocalSearchParams();
  const [workouts, setWorkouts] = useState<WorkoutModel[]>();

  useEffect(() => {
    console.log(user.workoutId);
    getWorkouts(user.workoutId.toString()).then(setWorkouts);
    console.log(workouts);
  }, []);

  return (
    <View style={{ height: '100%' }}>
      <FlatList
        style={{ padding: 50 }}
        data={workouts}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <WorkoutListItem workout={item} />}
      />
      <BottomNavBar newState={[false, true, false, false, false]} />
    </View>
  );
}
