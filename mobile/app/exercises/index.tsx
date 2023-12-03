import { useEffect, useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { ExerciseModel } from '../../types';
import { createExercise, getExercises } from '../../endpoints/exercises';
import ExerciseInputModal from '../../components/exercise/ExerciseInputModal';
import NewExercise from '../../components/exercise/NewExercise';
import BottomNavBar from '../../components/navbar/BottomNavBar';

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
      <NewExercise />
      <BottomNavBar newState={[false, false, false, false, true]} />
    </View>
  );
}
