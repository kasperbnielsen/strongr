import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext, useEffect, useState } from 'react';
import { Text, Image, FlatList, ScrollView, Pressable } from 'react-native';
import { View } from 'tamagui';

import BottomNavBar from '../../components/navbar/BottomNavBar';
import { getLastestWorkout, getWorkouts } from '../../endpoints/workouts';
import { Link } from 'expo-router';
import { WorkoutModel } from '../../types';
import WorkoutListItem from '../../components/workout/WorkoutListItem';
import Settings from '../../components/profile/Settings';

export default function Profile() {
  const [username, setUsername] = useState('');
  const [userid, setUserid] = useState('');
  const [lastWorkout, setLastWorkout] = useState('');
  const [workouts, setWorkouts] = useState<WorkoutModel[]>();
  const [open, setOpen] = useState<boolean>(false);

  async function getUsername() {
    const first_name = await AsyncStorage.getItem('userfirstname');
    const last_name = await AsyncStorage.getItem('userlastname');
    setUsername(first_name.concat(' ') + last_name);
  }

  async function getLastWorkout() {
    const workout = await getLastestWorkout(userid);
    setLastWorkout(workout);
  }

  function formatDate() {
    const current = new Date(Date.parse(lastWorkout));
    const day = new Date(Date.parse(lastWorkout)).toLocaleString('en-us', { weekday: 'long' });

    const daysSince = (new Date().getTime() - current.getTime()) / 1000 / 60 / 60 / 24;

    if (daysSince < 6) return day;
    else if (daysSince > 6 && current.getDay() < 13) return 'Last '.concat(day);
    else return current.toUTCString().slice(0, 16);
  }

  async function doThis() {
    await getUsername();
    await AsyncStorage.getItem('userid').then((id) => setUserid(id || 'kasper'));
  }

  useEffect(() => {
    try {
      getWorkouts(userid).then(setWorkouts);
    } catch (err) {
      console.error(err);
    }

    try {
      getLastWorkout();
    } catch (err) {
      console.error(err);
    }
  }, [userid]);

  useEffect(() => {
    doThis();
  }, []);
  return (
    <View style={{ height: '100%', backgroundColor: '#292727', position: 'relative' }}>
      <Settings open={open} close={() => setOpen(false)} />
      <View style={{ height: '90%' }}>
        <View
          style={{
            height: '15%',
            display: 'flex',
            flexDirection: 'row',
            margin: 24,
            alignContent: 'center',
          }}
        >
          <View style={{ width: '100%' }}>
            <Pressable style={{ width: '7.5%', height: '15%', alignSelf: 'flex-end' }} onPress={() => setOpen(true)}>
              <Image
                style={{
                  width: 24,
                  height: 24,
                  tintColor: 'white',
                }}
                source={{
                  uri: '../../assets/settings_icon.svg',
                }}
              />
            </Pressable>
            <View style={{ height: '50%' }}>
              <Text style={{ fontSize: 22, justifyContent: 'center', display: 'flex', color: 'white', height: '100%' }}>
                {' '}
                {username}{' '}
              </Text>
              <Text style={{ fontSize: 16, justifyContent: 'center', display: 'flex', color: 'white', height: '100%' }}>
                Last workout: {formatDate()}
              </Text>
            </View>
          </View>
        </View>

        <View style={{ gap: 8, paddingBottom: '20%', backgroundColor: '#292727' }}>
          <FlatList
            style={{}}
            data={workouts}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => <WorkoutListItem workout={item} />}
          />
        </View>
      </View>

      <BottomNavBar newState={[false, false, false, false, true]} />
    </View>
  );
}
