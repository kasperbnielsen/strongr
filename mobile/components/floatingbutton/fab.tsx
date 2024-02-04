import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, PanResponder, View, useAnimatedValue, Text, Pressable } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { UseDispatch } from '../../app/state';

export default function Fab({ open }: { open: () => void }) {
  const dispatcher = new UseDispatch();
  const oldPos = dispatcher.getState().position;

  const pos = useRef(new Animated.ValueXY({ x: oldPos.x, y: oldPos.y })).current;
  let valueX = 0;
  let valueY = 0;

  pos.x.addListener((value) => (valueX = value.value));
  pos.y.addListener((value) => (valueY = value.value));

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderGrant(event, gestureState) {
      pos.setOffset({ x: valueX, y: valueY });
      pos.setValue({ x: 0, y: 0 });
    },
    onPanResponderMove: Animated.event([
      null,
      {
        dx: pos.x,
        dy: pos.y,
      },
    ]),
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > gestureState.dy / 2) {
        console.log(gestureState.dx);
        Animated.spring(pos, { toValue: { x: gestureState.dx, y: 0 }, useNativeDriver: false }).start();
      } else {
        Animated.spring(pos, {
          toValue: { x: gestureState.dx, y: gestureState.dy },
          useNativeDriver: false,
        }).start();
      }
      pos.flattenOffset();
      dispatcher.tryDispatch(3, pos);
    },
  });
  return dispatcher.getState().workouts !== null ? (
    <View style={{ position: 'absolute', transform: pos.getTranslateTransform() }}>
      <Pressable style={{ transform: pos.getTranslateTransform() }} onPress={open}>
        <Animated.View
          style={{
            backgroundColor: 'blue',
            borderRadius: 100,
            padding: 24,
            alignItems: 'center',
            justifyContent: 'center',
            transform: pos.getTranslateTransform(),
          }}
          {...panResponder.panHandlers}
        >
          <Animated.Text style={{ position: 'absolute' }}>
            <Text>Hello</Text>
          </Animated.Text>
        </Animated.View>
      </Pressable>
    </View>
  ) : (
    <></>
  );
}
