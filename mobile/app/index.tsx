import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { Animated, PanResponder, Text, TouchableWithoutFeedback, View } from 'react-native';
import Draggable from 'react-native-draggable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TamaguiProvider, Theme } from 'tamagui';

import { UseDispatch, stateContext } from './state';
import config from './tamagui.config';
import Home from '../components/home/Home';
import LoginModal from '../components/login/LoginModal';
import SignupModal from '../components/login/SignupModal';
import BottomNavBar from '../components/navbar/BottomNavBar';
import WorkoutModal from '../components/workout/WorkoutModal';
import Fab from '../components/floatingbutton/fab';
import { WorkoutModel } from '../types';

export const Stack = createNativeStackNavigator();

const dispatcher = new UseDispatch();

export default function HomePage() {
  const [data, setData] = useState('');
  const [visible, setVisible] = useState(false);
  const [workout, setWorkout] = useState<WorkoutModel>();

  const dispatcher = new UseDispatch();

  function openWorkout() {
    return dispatcher.getState().workouts !== null ? (
      <WorkoutModal visible={visible} close={() => setVisible(false)} workouts={dispatcher.getState().workouts} />
    ) : (
      <></>
    );
  }

  useEffect(() => {
    const GetData = async () => {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        setData(value);
        dispatcher.tryDispatch(0, true);
      }
    };
    GetData();

    if (dispatcher.getState().workouts !== null) {
      setWorkout(dispatcher.getState().workouts);
    }
  }, []);

  return (
    <stateContext.Provider value={dispatcher}>
      <TamaguiProvider config={config}>
        <Theme name='dark'>
          <View style={{ height: '92%' }}>
            {dispatcher.getState().isLogged ? (
              <>
                <Stack.Navigator>
                  <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
                  <Stack.Screen name='Exercises' component={WorkoutModal} options={{ headerShown: false }} />
                  <Stack.Screen name='Settings' component={WorkoutModal} options={{ headerShown: false }} />
                  <Stack.Screen name='Workouts' component={WorkoutModal} options={{ headerShown: false }} />
                  <Stack.Screen name='Home2' component={WorkoutModal} options={{ headerShown: false }} />
                </Stack.Navigator>
                <BottomNavBar newState={[true, false, false, false, false]} />
              </>
            ) : (
              <Stack.Navigator>
                <Stack.Screen name='Login' component={LoginModal} options={{ headerShown: false }} />
                <Stack.Screen name='Signup' component={SignupModal} options={{ headerShown: false }} />
              </Stack.Navigator>
            )}
            <Fab
              open={() => {
                setVisible(true);
              }}
            />
          </View>
          {openWorkout()}
        </Theme>
      </TamaguiProvider>
    </stateContext.Provider>
  );
}
