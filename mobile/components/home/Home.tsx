import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, Pressable, Animated, PanResponder } from 'react-native';

import Summary from './Summary';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

function openProfile(): void {}

export default function Home() {
  const [username, setUsername] = useState<string>();

  const getUsername = async () => {
    const name = await AsyncStorage.getItem('userfirstname');
    setUsername(name);
  };

  useEffect(() => {
    getUsername();
  });
  return (
    <View style={{ height: '90%', backgroundColor: '#292727', width: '100%' }}>
      <ScrollView style={{ height: '100%', width: '100%' }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignSelf: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ paddingLeft: 25, fontSize: 22, color: 'white', width: '75%' }}> Hello {username} </Text>
        </View>
        <Summary />
      </ScrollView>
    </View>
  );
}
