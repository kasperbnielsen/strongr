import { useState } from 'react';
import { Button, FlatList, Modal, Pressable, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { ExerciseModel } from '../../types';

export default function ExerciseInputModal({
  visible,
  exercises,
  close,
  addExercise,
}: {
  visible: boolean;
  exercises: ExerciseModel[];
  close: () => void;
  addExercise: (exercise: ExerciseModel) => void;
}) {
  const [search, setSearch] = useState('');

  return (
    <Modal
      animationType='slide'
      style={{ borderColor: 'pink', borderWidth: 10, borderStyle: 'dashed' }}
      visible={visible}
      onRequestClose={close}
    >
      <View>
        <TextInput value={search} placeholder='Search...' onChangeText={(e) => setSearch(e.trim())} />
        <Pressable onPress={close} />
      </View>

      <FlatList
        style={{ marginTop: 16 }}
        data={
          search?.length
            ? exercises?.filter((e) => e?.title?.toLowerCase()?.includes(search.trim().toLowerCase()))
            : exercises ?? []
        }
        renderItem={({ item }) => <Button title={item.title} onPress={() => addExercise(item)} />}
      />
    </Modal>
  );
}
