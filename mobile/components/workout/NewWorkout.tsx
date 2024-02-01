import { Pressable } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import { View, Text } from 'tamagui';
import WorkoutModal from './WorkoutModal';
import { useState } from 'react';

function openEmptyWorkout() {
  return null;
}

export default function NewWorkout() {
  const [visible, setVisible] = useState(false);

  return (
    <View style={{ height: '100%' }}>
      <Pressable
        style={{
          padding: 12,
          backgroundColor: 'blue',
          borderRadius: 6,
          width: '50%',
          alignSelf: 'center',
          marginVertical: 24,
        }}
        onPress={() => setVisible(true)}
      >
        <Text style={{ fontWeight: '400', color: 'white', alignSelf: 'center' }}>New Empty Workout</Text>
      </Pressable>
      <WorkoutModal visible={visible} close={() => setVisible(false)} />
    </View>
  );
}
