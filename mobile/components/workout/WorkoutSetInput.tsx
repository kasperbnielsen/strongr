import { Button, Pressable, Text, TextInput, View, Image } from 'react-native';

import { ExerciseType, WorkoutModelExerciseSet } from '../../types';

export default function WorkoutSetInput({
  index,
  set,
  exerciseType,
  updateSet,
  deleteSet,
}: {
  index: number;
  set: WorkoutModelExerciseSet;
  exerciseType: ExerciseType;
  updateSet: (set: WorkoutModelExerciseSet) => void;
  deleteSet: () => void;
}) {
  const cleanInput = (input: string) => {
    const parsed = parseFloat(input);

    if (parsed < 0) return;

    return parsed;
  };

  if (exerciseType === ExerciseType.Time) {
    // TODO:
  }

  return (
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 4 }}>
      {/* TODO: switch between set type */}

      <Text style={{ fontWeight: '700', fontSize: 18 }}>{index + 1}.</Text>

      <TextInput
        placeholder='Reps'
        keyboardType='numeric'
        inputMode='numeric'
        value={set?.reps ? set?.reps?.toString() : ''}
        onChangeText={(text) => updateSet({ ...set, reps: cleanInput(text) })}
      />

      <TextInput
        placeholder='Weight'
        keyboardType='numeric'
        value={set?.weight ? set?.weight?.toString() : ''}
        inputMode='numeric'
        onChangeText={(text) => updateSet({ ...set, weight: cleanInput(text) })}
      />

      <Pressable onPress={deleteSet}>
        <Image source={{ uri: '../../assets/delete.svg' }} style={{ width: 12, height: 16 }} />
      </Pressable>
    </View>
  );
}
