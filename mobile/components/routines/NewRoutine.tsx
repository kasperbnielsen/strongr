import { ReactElement, JSXElementConstructor, useState, useEffect } from 'react';
import { View, Text, Pressable, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import { InputFrame } from 'tamagui';
import ExerciseInputModal from '../exercise/ExerciseInputModal';
import { ExerciseModel } from '../../types';
import { getExercises } from '../../endpoints/exercises';
import { createRoutine } from '../../endpoints/routines';

export default function NewRoutine({
  visible,
  close,
  userId,
}: {
  visible: boolean;
  close: () => void;
  userId: string;
}) {
  const [exercises, setExercises] = useState<{ title: string; description: string }[]>([]);
  const [title, setTitle] = useState('');
  const [exerciseVisible, setExerciseVisible] = useState(false);
  const [exerciseList, setExerciseList] = useState<ExerciseModel[]>();

  function addExercise(exercise: ExerciseModel) {
    setExercises([...exercises, { title: exercise.title, exercise_id: exercise._id.$oid }]);
    setExerciseVisible(false);
  }

  async function saveRoutine() {
    await createRoutine(userId, exercises, title);
  }

  useEffect(() => {
    getExercises().then(setExerciseList);
  }, []);

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
            flexDirection: 'row',
            gap: 24,
            justifyContent: 'center',
            width: '100%',
            height: '10%',
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: '600' }}>Title</Text>
          <InputFrame
            onChangeText={(text) => setTitle(text)}
            style={{ padding: 8, borderWidth: 1 }}
            focusStyle={{ outlineStyle: 'none' }}
          />
        </View>
        <Pressable
          onPress={() => setExerciseVisible(true)}
          style={{
            backgroundColor: 'blue',
            alignSelf: 'center',
            padding: 4,
            borderRadius: 5,
          }}
        >
          <Text>Add Exercise</Text>
        </Pressable>
        <FlatList
          style={{ width: '100%' }}
          data={exercises}
          renderItem={({ item, index }) => (
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Text style={{ alignSelf: 'center', margin: 12 }}> {index + 1}.</Text>
              <View style={{ margin: 24, width: '80%', flex: 1, flexDirection: 'column' }}>
                <Text style={{ fontSize: 18, fontWeight: 600 }}>{item.title}</Text>
                <Text>asd</Text>
              </View>
              <Pressable style={{ width: '20%', justifyContent: 'center' }}>
                <Image
                  source={{ uri: '../../assets/delete.svg' }}
                  style={{ width: 16, height: 16, tintColor: 'black', alignSelf: 'center' }}
                />
              </Pressable>
            </View>
          )}
        />
        <Pressable
          onPress={() => saveRoutine()}
          style={{ backgroundColor: 'green', borderRadius: 5, alignSelf: 'center', padding: 4, margin: 12 }}
        >
          <Text>Save</Text>
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
