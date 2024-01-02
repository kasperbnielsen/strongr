import { useState } from 'react';
import { TextInput, View, Text, Pressable } from 'react-native';
import Dropdown from './Dropdown';
import { ExerciseTypes as MuscleGroups } from '../../types';
import { Input, Button } from 'tamagui';
export default function NewExercise() {
  const [name, setName] = useState<string>();
  const [visible, setVisible] = useState<boolean>();

  return (
    <View style={{}}>
      <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'row', marginTop: 50, marginBottom: 50 }}>
        <Text style={{ marginRight: 25 }}>Title</Text>
        <Input size='$4' borderWidth={2} value={name} />
      </View>
      <View style={{ width: 200 }}>
        <Text>Muscle Group</Text>
        <Dropdown data={MuscleGroups} />
      </View>
      <Button alignSelf='center' size='$6' color='blue'>
        Hello
      </Button>

      <Pressable
        style={{
          borderColor: 'black',
          borderStyle: 'solid',
          borderWidth: 3,
          width: 100,
          height: 'auto',
          backgroundColor: 'grey',
          alignSelf: 'center',
          marginTop: 25,
        }}
      >
        <Text style={{ color: 'blue', alignSelf: 'center' }}>Create</Text>
      </Pressable>
    </View>
  );
}
