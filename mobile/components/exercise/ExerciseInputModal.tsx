import { useState } from 'react';
import { Button, FlatList, Modal, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { ExerciseEntity } from '../../types';

export default function ExerciseInputModal({
  visible,
  exercises,
  close,
  addExercise,
}: {
  visible: boolean;
  exercises: ExerciseEntity[];
  close: () => void;
  addExercise: (exercise: ExerciseEntity) => void;
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

        <Button onPress={close} title='Close' />
      </View>

      <FlatList
        style={{ marginTop: 16 }}
        data={
          search?.length
            ? exercises?.filter((e) => e?.title?.toLowerCase()?.includes(search.trim().toLowerCase()))
            : exercises ?? []
        }
        keyExtractor={(e) => e._id}
        renderItem={({ item }) => <Button title={item.title} onPress={() => addExercise(item)} />}
      />
    </Modal>
  );
}
