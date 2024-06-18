import { Button, Pressable, Text, TextInput, View, Image, Animated, PanResponder } from 'react-native';

import {
  ExerciseType,
  PreviousExercises,
  PreviousExercisesList,
  WorkoutModelExercise,
  WorkoutModelExerciseSet,
} from '../../types';
import { useEffect, useState } from 'react';
import { getPrevious } from '../../endpoints/exercises';

export default function WorkoutSetInput({
  index,
  set,
  exerciseType,
  updateSet,
  deleteSet,
  previous,
}: {
  index: number;
  set: WorkoutModelExerciseSet;
  exerciseType: ExerciseType;
  updateSet: (set: WorkoutModelExerciseSet) => void;
  deleteSet: () => void;
  previous: number;
}) {
  const cleanInput = (input: string) => {
    const parsed = parseFloat(input);

    if (parsed < 0) return;

    return parsed;
  };

  const position = new Animated.ValueXY();

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderGrant() {
      position.setValue({ x: 0, y: 0 });
    },
    onPanResponderMove: Animated.event([
      null,
      {
        dx: position.x,
        dy: position.y,
      },
    ]),
    onPanResponderRelease: (event, gestureState) => {
      position.flattenOffset();
    },
  });

  return (
    <Pressable style={{ transform: position.getTranslateTransform() }}>
      <Animated.View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',

          gap: 4,
          transform: position.getTranslateTransform(),
        }}
        {...panResponder.panHandlers}
      >
        <Animated.View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginVertical: 4,
            gap: 12,
            transform: position.getTranslateTransform(),
          }}
        >
          <Animated.Text style={{ width: '15%', textAlign: 'center' }}>{index + 1}</Animated.Text>
          {previous === null ? (
            <Animated.Text style={{ width: '25%', textAlign: 'center' }}></Animated.Text>
          ) : previous !== 0 ? (
            <Animated.Text style={{ width: '25%', textAlign: 'center' }}>
              {exerciseType === 'Weight' ? `${previous}kg` : `${previous}s`}
            </Animated.Text>
          ) : (
            <View style={{ width: '25%', justifyContent: 'center' }}>
              <View
                style={{
                  borderStyle: 'solid',
                  width: '25%',
                  alignSelf: 'center',
                  borderColor: 'black',
                  borderWidth: 2,
                  borderRadius: 8,
                }}
              />
            </View>
          )}
          <TextInput
            keyboardType='numeric'
            inputMode='numeric'
            value={set?.reps ? set?.reps?.toString() : ''}
            onChangeText={(text) => updateSet({ ...set, reps: cleanInput(text) })}
            style={{ width: '25%', backgroundColor: 'darkgray', borderRadius: 4, alignSelf: 'center' }}
          />
          <TextInput
            keyboardType='numeric'
            value={
              exerciseType === 'Weight'
                ? set?.weight
                  ? set?.weight?.toString()
                  : ''
                : set?.time
                ? set?.time?.toString()
                : ''
            }
            inputMode='numeric'
            onChangeText={(text) => {
              if (exerciseType === 'Weight') {
                updateSet({ ...set, weight: cleanInput(text) });
              } else {
                updateSet({ ...set, time: cleanInput(text) });
              }
            }}
            style={{ width: '25%', backgroundColor: 'darkgray', borderRadius: 4, alignSelf: 'center' }}
          />
          <Pressable onPress={deleteSet} style={{ width: '10%', alignSelf: 'center' }}>
            <Image source={{ uri: '../../assets/delete.svg' }} style={{ width: 12, height: 16 }} />
          </Pressable>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}
