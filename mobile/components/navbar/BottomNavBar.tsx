import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';
import { Link, useRootNavigation } from 'expo-router';
import { NavigatorProps } from 'expo-router/build/views/Navigator';
import { useEffect, useState } from 'react';
import { View, Image, Text, Pressable } from 'react-native';

import WorkoutModal from '../workout/WorkoutModal';

export default function BottomNavBar({ newState }: { newState: boolean[] }) {
  const [state, setState] = useState(newState);

  const [userid, setuserid] = useState<string>();

  useEffect(() => {
    const getUser = async () => {
      const user = await AsyncStorage.getItem('userid');
      if (user !== null) {
        setuserid(user);
      }
    };
    getUser();
  }, []);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        height: '8%',
        width: '100%',
      }}
    >
      <Link style={{ width: '20%', backgroundColor: state[0] ? 'green' : 'blue', display: 'flex' }} href=''>
        <View style={{ width: '100%' }}>
          <Image
            style={{ width: '100%', height: '65%' }}
            source={{
              uri: 'https://static.thenounproject.com/png/5243889-200.png',
            }}
          />
          <Text style={{ width: '100%', textAlign: 'center', height: '35%', fontSize: 12 }}>Home</Text>
        </View>
      </Link>

      <Link
        style={{ width: '20%', backgroundColor: state[1] ? 'green' : 'blue', display: 'flex' }}
        href={`workouts/${userid}`}
      >
        <View style={{ width: '100%' }}>
          <Image
            style={{ width: '100%', height: '65%' }}
            source={{
              uri: 'https://static.thenounproject.com/png/5243889-200.png',
            }}
          />
          <Text style={{ width: '100%', textAlign: 'center', height: '35%', fontSize: 12 }}>History</Text>
        </View>
      </Link>
      <Link style={{ width: '20%', backgroundColor: state[2] ? 'green' : 'blue', display: 'flex' }} href='/workouts'>
        <View style={{ width: '100%' }}>
          <Image
            style={{ width: '100%', height: '65%' }}
            source={{
              uri: 'https://static.thenounproject.com/png/5243889-200.png',
            }}
          />
          <Text style={{ width: '100%', textAlign: 'center', height: '35%', fontSize: 12 }}>New Workout</Text>
        </View>
      </Link>

      <Link style={{ width: '20%', display: 'flex', backgroundColor: state[3] ? 'green' : 'blue' }} href='/auth/login'>
        <View style={{ width: '100%' }}>
          <Image
            style={{ width: '100%', height: '65%' }}
            source={{
              uri: 'https://static.thenounproject.com/png/5243889-200.png',
            }}
          />
          <Text style={{ width: '100%', textAlign: 'center', height: '35%', fontSize: 12 }}>GoToASD</Text>
        </View>
      </Link>
      <Link style={{ width: '20%', backgroundColor: state[4] ? 'green' : 'blue', display: 'flex' }} href='/exercises'>
        <View style={{ width: '100%' }}>
          <Image
            style={{ width: '100%', height: '65%' }}
            source={{
              uri: 'https://static.thenounproject.com/png/5243889-200.png',
            }}
          />
          <Text style={{ width: '100%', textAlign: 'center', height: '35%', fontSize: 12 }}>Exercises</Text>
        </View>
      </Link>
    </View>
  );
}
