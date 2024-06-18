import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import { exerciseList } from '../../assets/exerciseList';
import BottomNavBar from '../../components/bottomnavbar/BottomNavBar';
import ExerciseGroup from '../../components/exercise/ExerciseGroup';
import { getExercises } from '../../endpoints/exercises';
import { ExerciseModel } from '../../types';

export default function ExerciseOverview() {
  const [exercises, setExercises] = useState<ExerciseModel[]>([]);

  useEffect(() => {
    getExercises().then(setExercises);
  }, []);

  return (
    <View style={{ height: '100%', backgroundColor: '#292727', position: 'relative' }}>
      <FlatList data={Object.keys(exerciseList)} renderItem={({ item, index }) => <ExerciseGroup group={item} />} />

      <BottomNavBar newState={[false, false, true, false]} />
    </View>
  );
}
