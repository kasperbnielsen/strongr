import { useState } from 'react';
import { FlatList, Pressable, Text } from 'react-native';
import { View } from 'tamagui';

import WorkoutModal from './WorkoutModal';
import { UseDispatch } from '../../app/state';
import Fab from '../floatingbutton/fab';
import TemplateCard from './TemplateCard';
import { Link } from 'expo-router';

export default function NewWorkout() {
  const [visible, setVisible] = useState(false);
  const dispatcher = new UseDispatch();

  const [savedVisible, setSavedVisible] = useState(false);
  const [templates, setTemplates] = useState<{ title: string; exercises: string[] }[]>([
    { title: 'Template 1', exercises: ['Exercise 1', 'Exercise 2', 'Exercise 3'] },
    { title: 'Template 2', exercises: ['Exercise 1', 'Exercise 2', 'Exercise 3'] },
    { title: 'Template 3', exercises: ['Exercise 1', 'Exercise 2', 'Exercise 3'] },
    { title: 'Template 4', exercises: ['Exercise 1', 'Exercise 2', 'Exercise 3'] },
    { title: 'Template 5', exercises: ['Exercise 1', 'Exercise 2', 'Exercise 3'] },
    { title: 'Template 6', exercises: ['Exercise 1', 'Exercise 2', 'Exercise 3'] },
    { title: 'Template 7', exercises: ['Exercise 1', 'Exercise 2', 'Exercise 3'] },
    { title: 'Template 8', exercises: ['Exercise 1', 'Exercise 2', 'Exercise 3'] },
    { title: 'Template 9', exercises: ['Exercise 1', 'Exercise 2', 'Exercise 3'] },
    { title: 'Template 10', exercises: ['Exercise 1', 'Exercise 2', 'Exercise 3'] },
    { title: 'Template 11', exercises: ['Exercise 1', 'Exercise 2', 'Exercise 3'] },
    { title: 'Template 12', exercises: ['Exercise 1', 'Exercise 2', 'Exercise 3'] },
  ]);

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
        <WorkoutModal visible={visible} close={() => setVisible(false)} workouts={null} />
      </Pressable>
      <View style={{ padding: 24, gap: 12 }}>
        <Text style={{ fontSize: 24, color: 'white' }}>Routines</Text>
        <FlatList
          numColumns={2}
          data={templates.filter((item, index) => index < 6)}
          renderItem={({ item, index }) =>
            index < 5 ? (
              <TemplateCard title={item.title} exercises={item.exercises} />
            ) : (
              <Pressable style={{ width: '100%' }} onPress={() => {}}>
                <TemplateCard title='Create New Routine' exercises={[]} />
              </Pressable>
            )
          }
        />
      </View>
      <Fab open={() => setSavedVisible(true)} />
      {openWorkout()}
    </View>
  );
}
