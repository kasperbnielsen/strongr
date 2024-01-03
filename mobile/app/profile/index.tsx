import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { View } from 'tamagui';

import BottomNavBar from '../../components/navbar/BottomNavBar';

export default function Profile() {
  const [username, setUsername] = useState('asd');

  async function get_username() {
    setUsername(await AsyncStorage.getItem('username'));
  }

  useEffect(() => {
    get_username();
  }, []);
  return (
    <View style={{ height: '100%', backgroundColor: '#292727' }}>
      <View>
        <Text>Hello {username} </Text>
      </View>
      <BottomNavBar newState={[false, true, false, false, false]} />
    </View>
  );
}
