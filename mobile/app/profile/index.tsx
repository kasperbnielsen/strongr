import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Text, Image, FlatList } from 'react-native';
import { View } from 'tamagui';

import BottomNavBar from '../../components/navbar/BottomNavBar';
import { getLastestWorkout, getWorkouts } from '../../endpoints/workouts';
import { Link } from 'expo-router';
import { WorkoutModel } from '../../types';
import WorkoutListItem from '../../components/workout/WorkoutListItem';

export default function Profile() {
  const [username, setUsername] = useState('');
  const [userid, setUserid] = useState('');
  const [lastWorkout, setLastWorkout] = useState('');
  const [workouts, setWorkouts] = useState<WorkoutModel[]>();

  async function get_username() {
    const first_name = await AsyncStorage.getItem('userfirstname');
    const last_name = await AsyncStorage.getItem('userlastname');
    setUsername(first_name.concat(' ') + last_name);
  }

  async function get_last_workout() {
    const workout = await getLastestWorkout(userid);
    setLastWorkout(workout);
  }

  function format_date() {
    const current = new Date(Date.parse(lastWorkout));
    const day = new Date(Date.parse(lastWorkout)).toLocaleString('en-us', { weekday: 'long' });

    const daysSince = (new Date().getTime() - current.getTime()) / 1000 / 60 / 60 / 24;

    if (daysSince < 6) return day;
    else if (daysSince > 6 && current.getDay() < 13) return 'Last '.concat(day);
    else return current.toUTCString().slice(0, 16);
  }

  async function doThis() {
    await get_username();
    await AsyncStorage.getItem('userid').then((id) => setUserid(id || 'kasper'));
  }

  useEffect(() => {
    try {
      getWorkouts(userid).then(setWorkouts);
    } catch (err) {
      console.error(err);
    }

    try {
      get_last_workout();
    } catch (err) {
      console.error(err);
    }
  }, [userid]);

  useEffect(() => {
    doThis();
  }, []);
  return (
    <View style={{ height: '100%', backgroundColor: '#292727' }}>
      <View
        style={{
          height: '4%',
          display: 'flex',
          flexDirection: 'row',
          margin: 24,
          alignContent: 'center',
        }}
      >
        <View style={{ width: '100%' }}>
          <Image
            style={{
              width: '7.5%',
              height: '100%',
              tintColor: 'white',
              alignSelf: 'flex-end',
            }}
            source={{
              uri: '../../assets/settings_icon.svg',
            }}
          />
        </View>
      </View>
      <View style={{ gap: 8 }}>
        <Text style={{ fontSize: 22, justifyContent: 'center', display: 'flex', color: 'white' }}> {username} </Text>
        <Text style={{ fontSize: 16, justifyContent: 'center', display: 'flex', color: 'white' }}>
          Last workout: {format_date()}
        </Text>
        <FlatList
          style={{}}
          data={workouts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <WorkoutListItem workout={item} />}
        />
      </View>

      <BottomNavBar newState={[false, true, false, false, false]} />
    </View>
  );
}
