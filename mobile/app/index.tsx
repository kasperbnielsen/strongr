import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { View, Text, ImageBackground } from 'react-native';

import LoginModal from '../components/login/LoginModal';
import SignupModal from '../components/login/SignupModal';
import BottomNavBar from '../components/navbar/BottomNavBar';
import WorkoutModal from '../components/workout/WorkoutModal';
import { useNavigation } from 'expo-router';
import Home from '../components/home/Home';
const image = { uri: '../assets/desktop-bg.svg' };
export const Stack = createNativeStackNavigator();

const initialState = { isLogged: 'NotLogged' };
function reducer(state, action) {
  if (action.type === 'UserIsLogged') {
    return { isLogged: 'UserIsLogged' };
  } else {
    return { isLogged: 'NotLogged' };
  }
}

export default function HomePage() {
  const [data, setData] = useState('');

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getData = async () => {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        setData(value);
        dispatch({ type: 'UserIsLogged' });
      }
    };
    getData();
  }, []);

  return (
    <>
      {state.isLogged === 'UserIsLogged' ? (
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
    </>
  );
}
