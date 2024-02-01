import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

import BottomNavBar from '../../components/navbar/BottomNavBar';
import WorkoutModal from '../../components/workout/WorkoutModal';
import { getWorkouts } from '../../endpoints/workouts';
import { WorkoutModel } from '../../types';
import NewWorkout from '../../components/workout/NewWorkout';

export default function WorkoutOverview() {
  const [workouts, setWorkouts] = useState<WorkoutModel[]>([]);
  const [userid, setUserid] = useState<string>();

  useEffect(() => {
    const getData = async () => {
      const value = await AsyncStorage.getItem('userid');
      if (value !== null) {
        setUserid(value);
        console.log(userid);
      }
    };

    getData()
      .then(() => getWorkouts)
      .finally(() => setWorkouts);
  }, []);

  return (
    <View style={{ height: '100%', backgroundColor: '#292727' }}>
      <NewWorkout />
      <BottomNavBar newState={[false, false, true, false, false]} />
    </View>
  );
}
