import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, Image, View, Modal } from 'react-native';

import TemplateCard from './TemplateCard';
import WorkoutModal from './WorkoutModal';
import { UseDispatch } from '../../app/state';
import { getRoutines } from '../../endpoints/routines';
import { Routines, RoutinesInput, WorkoutModelOutput } from '../../types';
import Fab from '../floatingbutton/fab';
import NewRoutine from '../routines/NewRoutine';
import RoutinePrompt from '../routines/RoutinePrompt';

export default function NewWorkout() {
  const [visible, setVisible] = useState(false);
  const dispatcher = new UseDispatch();
  const [routineVisible, setRoutineVisible] = useState(false);
  const [promptVisible, setPromptVisible] = useState(false);
  const [workouts, setWorkouts] = useState(null);

  const [savedVisible, setSavedVisible] = useState(false);

  function openWorkout() {
    return dispatcher.getState().workouts !== null ? (
      <WorkoutModal
        visible={savedVisible}
        close={() => setSavedVisible(false)}
        workouts={dispatcher.getState().workouts}
        isRoutine={false}
        getSavedWorkout={(workout: Routines) => {
          setWorkouts(workout);
          setPromptVisible(true);
        }}
      />
    ) : (
      <></>
    );
  }

  return (
    <View style={{ height: '100%' }}>
      <RoutinePrompt visible={promptVisible} workout={workouts} close={() => setPromptVisible(false)} />

      <Text style={{ fontSize: 32, alignSelf: 'center', color: 'white', padding: 8 }}>Start New Workout</Text>
      <Pressable
        style={{
          padding: 8,
          backgroundColor: '#26ebfc',
          borderRadius: 6,
          width: '85%',
          alignSelf: 'center',
          marginVertical: 24,
        }}
        onPress={() => setVisible(true)}
      >
        <Text style={{ fontWeight: '600', color: 'white', alignSelf: 'center' }}>New Empty Workout</Text>
        <WorkoutModal
          visible={visible}
          close={() => setVisible(false)}
          workouts={workouts}
          isRoutine={false}
          getSavedWorkout={(workout: Routines) => {
            setWorkouts(workout);
            setPromptVisible(true);
          }}
        />
      </Pressable>

      <Fab open={() => setSavedVisible(true)} />
      {openWorkout()}
    </View>
  );
}
