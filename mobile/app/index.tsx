import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import { Animated, PanResponder, Text, TouchableWithoutFeedback, View, Image, Pressable } from 'react-native';
import Draggable from 'react-native-draggable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TamaguiProvider, Theme } from 'tamagui';

import { UseDispatch, stateContext } from './state';
import config from './tamagui.config';
import Home from '../components/home/Home';
import LoginModal from '../components/login/LoginModal';
import SignupModal from '../components/login/SignupModal';
import BottomNavBar from '../components/bottomnavbar/BottomNavBar';
import WorkoutModal from '../components/workout/WorkoutModal';
import Fab from '../components/floatingbutton/fab';
import { Routines as Routs, WorkoutModel } from '../types';
import NewWorkout from '../components/workout/NewWorkout';
import ExerciseOverview from './exercises';
import ExerciseInputModal from '../components/exercise/ExerciseInputModal';
import NewExercise from '../components/exercise/NewExercise';
import History from './history';
import Settings from '../components/profile/Settings';
import Routines from './routines';
import Timer from '../components/stopwatch/Timer';
import RoutinePrompt from '../components/routines/RoutinePrompt';

export const Stack = createNativeStackNavigator();

const dispatcher = new UseDispatch();

export default function HomePage({ navigation }) {
  const [data, setData] = useState('');
  const [visible, setVisible] = useState(false);
  const [workout, setWorkout] = useState<WorkoutModel>();
  const [showNewWorkout, setShowNewWorkout] = useState(false);
  const [routineWorkouts, setRoutineWorkouts] = useState(null);
  const [promptVisible, setPromptVisible] = useState(false);

  const dispatcher = new UseDispatch();

  function openWorkout() {
    return dispatcher.getState().workouts !== null ? (
      <WorkoutModal
        visible={visible}
        close={() => setVisible(false)}
        workouts={dispatcher.getState().workouts}
        isRoutine={false}
        getSavedWorkout={() => {}}
      />
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
                  <Stack.Screen name='Workouts' component={History} options={{ headerShown: false }} />
                  <Stack.Screen name='Exercises' component={ExerciseOverview} options={{ headerShown: false }} />
                  <Stack.Screen name='Settings' component={Routines} options={{ headerShown: false }} />
                </Stack.Navigator>
                <View
                  style={{
                    position: 'fixed',
                    bottom: '4%',
                    backgroundColor: '#d2f8d2',
                    alignSelf: 'center',
                    justifyContent: 'center',
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                  }}
                >
                  <Pressable
                    onPress={() =>
                      dispatcher.getState().workouts === null ? setShowNewWorkout(true) : setVisible(true)
                    }
                  >
                    {dispatcher.getState().workouts !== null ? (
                      <Animated.Text style={{ alignSelf: 'center' }}>
                        <Timer startTime={dispatcher.getState().workouts?.started_at} />
                      </Animated.Text>
                    ) : (
                      <Image
                        style={{
                          width: 46,
                          height: 46,
                          tintColor: 'black',
                          alignSelf: 'center',
                        }}
                        source={{
                          uri: '../assets/plus.svg',
                        }}
                      />
                    )}
                  </Pressable>
                </View>
                {showNewWorkout ? (
                  <WorkoutModal
                    visible={showNewWorkout}
                    close={() => setShowNewWorkout(false)}
                    workouts={null}
                    isRoutine={false}
                    getSavedWorkout={(workouts: Routs) => {
                      setRoutineWorkouts(workouts);
                      setPromptVisible(true);
                    }}
                  />
                ) : (
                  <></>
                )}
              </>
            ) : (
              <Stack.Navigator>
                <Stack.Screen name='Login' component={LoginModal} options={{ headerShown: false }} />
                <Stack.Screen name='Signup' component={SignupModal} options={{ headerShown: false }} />
              </Stack.Navigator>
            )}
          </View>
          {openWorkout()}
          <RoutinePrompt workout={routineWorkouts} close={() => setPromptVisible(false)} visible={promptVisible} />
        </Theme>
      </TamaguiProvider>
    </stateContext.Provider>
  );
}
