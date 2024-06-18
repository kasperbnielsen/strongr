import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Image, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function BottomNavBar({ newState }) {
  const navigation = useNavigation();

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
      <Pressable
        style={{ width: '20%', backgroundColor: state[0] ? '#4290f5' : '#155ab3', display: 'flex' }}
        onPress={() => navigation.navigate('Home')}
      >
        <View style={{ width: '100%' }}>
          <Image
            style={{ width: 24, height: 24, alignSelf: 'center', marginTop: 10, tintColor: 'white' }}
            source={{
              uri: '../../assets/home.svg',
            }}
          />
          <Text style={{ width: '100%', textAlign: 'center', height: '50%', fontSize: 12, color: 'white' }}>Home</Text>
        </View>
      </Pressable>
      <Pressable
        style={{ width: '20%', backgroundColor: state[1] ? '#4290f5' : '#155ab3', display: 'flex' }}
        onPress={() => navigation.navigate('Workouts')}
      >
        <View style={{ width: '100%' }}>
          <Image
            style={{ width: 24, height: 24, alignSelf: 'center', marginTop: 10, tintColor: 'white' }}
            source={{
              uri: '../../assets/history.svg',
            }}
          />
          <Text style={{ width: '100%', textAlign: 'center', height: '50%', fontSize: 12, color: 'white' }}>
            Workouts
          </Text>
        </View>
      </Pressable>
      <View style={{ width: '20%', backgroundColor: '#155ab3' }}></View>

      <Pressable
        style={{ width: '20%', backgroundColor: state[2] ? '#4290f5' : '#155ab3', display: 'flex' }}
        onPress={() => navigation.navigate('Exercises')}
      >
        <View style={{ width: '100%' }}>
          <Image
            style={{ width: 24, height: 24, alignSelf: 'center', marginTop: 10, tintColor: 'white' }}
            source={{
              uri: '../../assets/exercise.svg',
            }}
          />
          <Text style={{ width: '100%', textAlign: 'center', height: '50%', fontSize: 12, color: 'white' }}>
            Exercises
          </Text>
        </View>
      </Pressable>
      <Pressable
        style={{ width: '20%', backgroundColor: state[3] ? '#4290f5' : '#155ab3', display: 'flex' }}
        onPress={() => navigation.navigate('Settings')}
      >
        <View style={{ width: '100%' }}>
          <Image
            style={{ width: 24, height: 24, alignSelf: 'center', marginTop: 10, tintColor: 'white' }}
            source={{
              uri: '../../assets/settings_icon.svg',
            }}
          />
          <Text style={{ width: '100%', textAlign: 'center', height: '50%', fontSize: 12, color: 'white' }}>
            Settings
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
