import { useEffect, useState } from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { ExerciseEntity } from '../../types';
import { createExercise, getExercises } from '../../endpoints/exercises';
import ExerciseInputModal from '../../components/exercise/ExerciseInputModal';

export default function ExerciseOverview() {
  const [exercises, setExercises] = useState<ExerciseEntity[]>([]);

  const [showExercise, setShowExercise] = useState<boolean>(true);

  useEffect(() => {
    getExercises().then(setExercises);
  }, []);

  function addExercise(entity: ExerciseEntity) {
    createExercise(entity);
  }

  return (
    <View>
      <FlatList
        style={{ marginTop: 16 }}
        data={exercises}
        keyExtractor={(e) => e._id}
        renderItem={({ item }) => (
          <ExerciseInputModal
            visible={showExercise}
            exercises={exercises}
            close={() => {
              setShowExercise(false);
            }}
            addExercise={addExercise}
          />
        )}
      />
    </View>
  );
}
