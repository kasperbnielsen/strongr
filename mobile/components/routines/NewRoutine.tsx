import { ReactElement, JSXElementConstructor, useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { InputFrame } from 'tamagui';
import ExerciseInputModal from '../exercise/ExerciseInputModal';
import { ExerciseModel } from '../../types';
import { getExercises } from '../../endpoints/exercises';

export default function NewRoutine({ visible, close }: { visible: boolean; close: () => void }) {
  const [exercises, setExercises] = useState<{ title: string; description: string }[]>([]);
  const [title, setTitle] = useState('');
  const [exerciseVisible, setExerciseVisible] = useState(false);
  const [exerciseList, setExerciseList] = useState<ExerciseModel[]>();

  function addExercise(exercise: ExerciseModel) {
    setExercises([...exercises, { title: exercise.title, description: exercise.description }]);
    setExerciseVisible(false);
  }

  useEffect(() => {
    getExercises().then(setExerciseList);
  });

  return (
    <Modal
      style={{ backgroundColor: 'white', alignContent: 'center' }}
      isVisible={visible}
      onSwipeComplete={() => {
        close();
        setExercises([]);
      }}
      swipeDirection='down'
    >
      <View style={{ backgroundColor: 'white', alignSelf: 'center', height: '100%', width: '100%' }}>
        <View
          style={{
            borderStyle: 'solid',
            borderWidth: 3,
            borderColor: 'black',
            top: 0,
            width: '90%',
            margin: 12,
            alignSelf: 'center',
            borderRadius: 10,
          }}
        />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            gap: 24,
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: '600' }}>Title</Text>
          <InputFrame style={{ padding: 8, borderWidth: 1 }} focusStyle={{ outlineStyle: 'none' }} />
        </View>
        <FlatList
          data={exercises}
          renderItem={({ item, index }) => (
            <View>
              <Text>{item.title}</Text>
              <Text>{item.description}</Text>
            </View>
          )}
        />
        <Pressable onPress={() => setExerciseVisible(true)}>
          <Text>Add Exercise</Text>
        </Pressable>
        <ExerciseInputModal
          visible={exerciseVisible}
          exercises={exerciseList}
          close={() => setExerciseVisible(false)}
          addExercise={addExercise}
        />
      </View>
    </Modal>
  );
}
