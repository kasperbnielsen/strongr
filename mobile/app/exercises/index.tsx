import { useEffect, useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';

import ExerciseInputModal from '../../components/exercise/ExerciseInputModal';
import NewExercise from '../../components/exercise/NewExercise';
import BottomNavBar from '../../components/navbar/BottomNavBar';
import { createExercise, getExercises } from '../../endpoints/exercises';
import { ExerciseModel } from '../../types';

export default function ExerciseOverview() {
  const [exercises, setExercises] = useState<ExerciseModel[]>([]);

  const [showExercise, setShowExercise] = useState<boolean>(true);

  useEffect(() => {
    getExercises().then(setExercises);
  }, []);

  function addExercise(entity: ExerciseModel) {
    createExercise(entity);
  }

  return (
    <View style={{ height: '100%' }}>
      <BottomNavBar newState={[false, false, false, false, true]} />
    </View>
  );
}
