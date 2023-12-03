import { View, Text, ScrollView } from 'react-native';
import BottomNavBar from '../navbar/BottomNavBar';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Summary from './Summary';

export default function Home() {
  const [username, setUsername] = useState<string>();

  const getUsername = async () => {
    let name = await AsyncStorage.getItem('userfirstname');
    setUsername(name);
  };

  useEffect(() => {
    getUsername();
  });
  return (
    <View style={{ height: '100%' }}>
      <ScrollView>
        <Text style={{ paddingLeft: 25, paddingTop: 15, fontSize: 22 }}> Hello {username} </Text>
        <Summary />
      </ScrollView>
      <BottomNavBar newState={[true, false, false, false, false]} />
    </View>
  );
}
