import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useEffect, useState } from 'react';
import { Text, Image, FlatList, ScrollView, Pressable } from 'react-native';
import { View } from 'tamagui';

import BottomNavBar from '../../components/bottomnavbar/BottomNavBar';
import { getLastestWorkout, getWorkouts } from '../../endpoints/workouts';
import { Link } from 'expo-router';
import { WorkoutModel } from '../../types';
import WorkoutListItem from '../../components/workout/WorkoutListItem';
import Settings from '../../components/profile/Settings';
import Fab from '../../components/floatingbutton/fab';
import WorkoutModal from '../../components/workout/WorkoutModal';
import { UseDispatch } from '../state';

export default function Profile() {
  const [username, setUsername] = useState('');
  const [userid, setUserid] = useState('');
  const [visible, setVisible] = useState(false);

  const dispatcher = new UseDispatch();

  async function getUsername() {
    const first_name = await AsyncStorage.getItem('userfirstname');
    const last_name = await AsyncStorage.getItem('userlastname');
    setUsername(first_name.concat(' ') + last_name);
  }

  function openWorkout() {
    return dispatcher.getState().workouts !== null ? (
      <WorkoutModal visible={visible} close={() => setVisible(false)} workouts={dispatcher.getState().workouts} />
    ) : (
      <></>
    );
  }

  return (
    <View style={{ height: '100%', backgroundColor: '#292727', position: 'relative' }}>
      <Fab open={() => setVisible(true)} />
      {openWorkout()}
      <BottomNavBar newState={[false, false, false, false, true]} />
    </View>
  );
}
