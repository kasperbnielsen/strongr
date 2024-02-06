import { useState } from 'react';
import { Pressable } from 'react-native';
import { View, Text } from 'tamagui';

import WorkoutModal from './WorkoutModal';
import { UseDispatch } from '../../app/state';
import Fab from '../floatingbutton/fab';

export default function NewWorkout() {
  const [visible, setVisible] = useState(false);
  const dispatcher = new UseDispatch();

  const [savedVisible, setSavedVisible] = useState(false);

  function openWorkout() {
    return dispatcher.getState().workouts !== null ? (
      <WorkoutModal
        visible={savedVisible}
        close={() => setSavedVisible(false)}
        workouts={dispatcher.getState().workouts}
      />
    ) : (
      <></>
    );
  }

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
        <WorkoutModal visible={visible} close={() => setVisible(false)} workouts={null} />
      </Pressable>
      <Fab open={() => setSavedVisible(true)} />
      {openWorkout()}
    </View>
  );
}
