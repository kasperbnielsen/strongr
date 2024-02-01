import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { TamaguiProvider, Theme } from 'tamagui';

import { UseDispatch, stateContext } from './state';
import config from './tamagui.config';
import Home from '../components/home/Home';
import LoginModal from '../components/login/LoginModal';
import SignupModal from '../components/login/SignupModal';
import BottomNavBar from '../components/navbar/BottomNavBar';
import WorkoutModal from '../components/workout/WorkoutModal';

export const Stack = createNativeStackNavigator();

const dispatcher = new UseDispatch();

export default function HomePage() {
  const [data, setData] = useState('');

  useEffect(() => {
    const GetData = async () => {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        setData(value);
        dispatcher.tryDispatch(0, true);
      }
    };
    GetData();
  }, []);

  return (
    <stateContext.Provider value={dispatcher}>
      <TamaguiProvider config={config}>
        <Theme name='dark'>
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
        </Theme>
      </TamaguiProvider>
    </stateContext.Provider>
  );
}
