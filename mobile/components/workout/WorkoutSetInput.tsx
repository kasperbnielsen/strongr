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
    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      {/* TODO: switch between set type */}
      {exerciseType === 'Weight' ? <></> : <></>}

      <View style={{ flex: 1, flexDirection: 'row', marginVertical: 4, gap: 12 }}>
        <Text style={{ width: '15%', textAlign: 'center' }}>{index + 1}</Text>
        <Text style={{ width: '25%', textAlign: 'center' }}>100</Text>
        <TextInput
          keyboardType='numeric'
          inputMode='numeric'
          value={set?.reps ? set?.reps?.toString() : ''}
          onChangeText={(text) => updateSet({ ...set, reps: cleanInput(text) })}
          style={{ width: '25%', backgroundColor: 'darkgray', borderRadius: 4, alignSelf: 'center' }}
        />

        <TextInput
          keyboardType='numeric'
          value={set?.weight ? set?.weight?.toString() : ''}
          inputMode='numeric'
          onChangeText={(text) => updateSet({ ...set, weight: cleanInput(text) })}
          style={{ width: '25%', backgroundColor: 'darkgray', borderRadius: 4, alignSelf: 'center' }}
        />
        <Pressable onPress={deleteSet} style={{ width: '10%', alignSelf: 'center' }}>
          <Image source={{ uri: '../../assets/delete.svg' }} style={{ width: 12, height: 16 }} />
        </Pressable>
      </View>
    </View>
  );
}
