import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Image, Text } from 'react-native';

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
        position: 'fixed',
        bottom: 0,
        height: '8%',
        width: '100%',
      }}
    >
      <Link style={{ width: '20%', backgroundColor: state[0] ? '#4290f5' : '#155ab3', display: 'flex' }} href=''>
        <View style={{ width: '100%' }}>
          <Image
            style={{ width: 24, height: 24, alignSelf: 'center', marginTop: 10, tintColor: 'white' }}
            source={{
              uri: '../../assets/home.svg',
            }}
          />
          <Text style={{ width: '100%', textAlign: 'center', height: '50%', fontSize: 12, color: 'white' }}>Home</Text>
        </View>
      </Link>
      <Link
        style={{ width: '20%', backgroundColor: state[1] ? '#4290f5' : '#155ab3', display: 'flex' }}
        href='/routines'
      >
        <View style={{ width: '100%' }}>
          <Image
            style={{ width: 24, height: 24, alignSelf: 'center', marginTop: 10, tintColor: 'white' }}
            source={{
              uri: '../../assets/routines.svg',
            }}
          />
          <Text style={{ width: '100%', textAlign: 'center', height: '50%', fontSize: 12, color: 'white' }}>
            Routines
          </Text>
        </View>
      </Link>
      <Link
        style={{ width: '20%', backgroundColor: state[2] ? '#4290f5' : '#155ab3', display: 'flex' }}
        href='/workouts'
      >
        <View style={{ width: '100%' }}>
          <Image
            style={{ width: 24, height: 24, alignSelf: 'center', marginTop: 10, tintColor: 'white' }}
            source={{
              uri: 'https://api.iconify.design/fluent-mdl2/add-to.svg',
            }}
          />
          <Text style={{ width: '100%', textAlign: 'center', height: '20%', fontSize: 12, color: 'white' }}>
            New Workout
          </Text>
        </View>
      </Link>
      <Link
        style={{ width: '20%', backgroundColor: state[3] ? '#4290f5' : '#155ab3', display: 'flex' }}
        href='/history'
      >
        <View style={{ width: '100%' }}>
          <Image
            style={{ width: 24, height: 24, alignSelf: 'center', marginTop: 10, tintColor: 'white' }}
            source={{
              uri: '../../assets/history.svg',
            }}
          />
          <Text style={{ width: '100%', textAlign: 'center', height: '50%', fontSize: 12, color: 'white' }}>
            History
          </Text>
        </View>
      </Link>

      <Link
        style={{ width: '20%', backgroundColor: state[4] ? '#4290f5' : '#155ab3', display: 'flex' }}
        href='/profile'
      >
        <View style={{ width: '100%' }}>
          <Image
            style={{ width: 24, height: 24, alignSelf: 'center', marginTop: 10, tintColor: 'white' }}
            source={{
              uri: 'https://api.iconify.design/carbon/user-avatar-filled-alt.svg',
            }}
          />
          <Text style={{ width: '100%', textAlign: 'center', height: '50%', fontSize: 12, color: 'white' }}>
            Profile
          </Text>
        </View>
      </Link>
    </View>
  );
}
