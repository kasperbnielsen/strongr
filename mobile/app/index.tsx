import { View, Text } from 'react-native';

import WorkoutModal from '../components/workout/WorkoutModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import LoginModal from '../components/login/LoginModal';
import SignupModal from '../components/login/SignupModal';

export default function HomePage() {
  const [data, setData] = useState('');
  const [visible, setVisible] = useState(false);
  const [signup, setSignup] = useState(false);

  const getData = async () => {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      setData(value);
    }
  };

  useEffect(() => {
    getData();
    if (data) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  });

  return (
    <View>
      <View style={{ height: '100%' }}>
        <LoginModal visible={visible} next={() => setSignup(true)} close={() => setVisible(false)} />
      </View>
      <View style={{ height: '100%', flex: 1 }}>
        <SignupModal visible={signup} close={() => setSignup} />
      </View>
      <WorkoutModal />
    </View>
  );
}
