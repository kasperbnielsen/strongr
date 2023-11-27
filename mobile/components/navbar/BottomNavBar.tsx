import { Link } from 'expo-router';
import { useState } from 'react';
import { View, Image, Text } from 'react-native';

export default function BottomNavBar() {
  const [state, setState] = useState([false, false, false, false, false]);

  function clickNav(n: number) {
    const temp = [].fill(false, 0, 5);
    temp[n] = !temp[n];
    setState(temp);
  }

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
      <Link
        style={{ width: '20%', backgroundColor: state[0] ? 'green' : 'blue', display: 'flex' }}
        onPress={() => {
          clickNav(0);
        }}
        href={'/workouts'}
      >
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
      <Link
        style={{ width: '20%', backgroundColor: state[1] ? 'green' : 'blue', display: 'flex' }}
        onPress={() => {
          clickNav(1);
        }}
        href={'/exercises'}
      >
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
      <Link
        style={{ width: '20%', backgroundColor: state[2] ? 'green' : 'blue', display: 'flex' }}
        onPress={() => {
          clickNav(2);
        }}
        href={'workouts/Houge'}
      >
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
      <Link
        style={{ width: '20%', backgroundColor: state[3] ? 'green' : 'blue', display: 'flex' }}
        onPress={() => {
          clickNav(3);
        }}
        href={''}
      >
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
      <Link
        style={{ width: '20%', display: 'flex', backgroundColor: state[4] ? 'green' : 'blue' }}
        onPress={() => {
          clickNav(4);
        }}
        href={'/auth/login'}
      >
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
    </View>
  );
}
