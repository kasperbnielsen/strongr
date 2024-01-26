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
        height: '10%',
        width: '100%',
      }}
    >
      <Link style={{ width: '33.33%', backgroundColor: state[0] ? 'grey' : '#45403f', display: 'flex' }} href=''>
        <View style={{ width: '100%' }}>
          <Image
            style={{ width: '25%', height: '50%', alignSelf: 'center', marginTop: 10, tintColor: 'white' }}
            source={{
              uri: 'https://api.iconify.design/carbon/home.svg',
            }}
          />
          <Text style={{ width: '100%', textAlign: 'center', height: '50%', fontSize: 12, color: 'white' }}>Home</Text>
        </View>
      </Link>

      <Link
        style={{ width: '33.33%', backgroundColor: state[2] ? 'grey' : '#45403f', display: 'flex' }}
        href='/workouts'
      >
        <View style={{ width: '100%' }}>
          <Image
            style={{ width: '25%', height: '50%', alignSelf: 'center', marginTop: 10, tintColor: 'white' }}
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
        style={{ width: '33.33%', backgroundColor: state[1] ? 'grey' : '#45403f', display: 'flex' }}
        href='/profile'
      >
        <View style={{ width: '100%' }}>
          <Image
            style={{ width: '25%', height: '50%', alignSelf: 'center', marginTop: 10, tintColor: 'white' }}
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
