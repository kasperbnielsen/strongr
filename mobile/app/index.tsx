import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useReducer, useState } from 'react';
import { View, Text, ImageBackground } from 'react-native';

import LoginModal from '../components/login/LoginModal';
import SignupModal from '../components/login/SignupModal';
import BottomNavBar from '../components/navbar/BottomNavBar';
import WorkoutModal from '../components/workout/WorkoutModal';
const image = { uri: '../assets/desktop-bg.svg' };

const Stack = createNativeStackNavigator();

export default function HomePage() {
  const [data, setData] = useState('');

  const [state, dispatch] = useReducer(
    (prevState, action) => {
      if (action.type === 'UserIsLogged') {
        return { isLogged: true };
      } else {
        return { isLogged: false };
      }
    },
    { isLogged: false }
  );

  const doThis = () => dispatch('UserIsLogged');

  useEffect(() => {
    const getData = async () => {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        setData(value);
        dispatch('UserIsLogged');
      }
    };
    getData();
  }, []);

  return (
    <>
      {state.isLogged ? (
        <Stack.Navigator>
          <Stack.Screen name='Workouts' component={WorkoutModal} options={{ headerShown: false }} />
          <Stack.Screen name='Exercises' component={WorkoutModal} options={{ headerShown: false }} />
          <Stack.Screen name='Settings' component={WorkoutModal} options={{ headerShown: false }} />
          <Stack.Screen name='Home' component={WorkoutModal} options={{ headerShown: false }} />
          <Stack.Screen name='Home2' component={WorkoutModal} options={{ headerShown: false }} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name='Login' component={LoginModal({ doThis })} options={{ headerShown: false }} />
          <Stack.Screen name='Signup' component={SignupModal} options={{ headerShown: false }} />
        </Stack.Navigator>
      )}
    </>
  );
}
