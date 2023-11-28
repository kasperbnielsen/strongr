import { Link } from 'expo-router';
import { ImageBackground, ImageBase, Text, View } from 'react-native';

import LoginModal from '../../components/login/LoginModal';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SignUpPage from './register';
import SignupModal from '../../components/login/SignupModal';

export default function LoginPage() {
  return (
    <View style={{ height: '100%' }}>
      <Text style={{ height: '25%', alignSelf: 'center', fontSize: 26, paddingTop: 50, color: 'white' }}> Login </Text>
    </View>
  );
}
