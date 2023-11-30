import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { TextInput, View, Text, Pressable, Modal, ImageBackground, Button } from 'react-native';

import { AuthenticateCredentials } from '../../endpoints/authentication';
import { UserModel } from '../../types';
const image = { uri: '../../assets/desktop-bg.svg' };

export default function LoginModal({
  visible,
  close,
  next,
}: {
  visible: boolean;
  close: () => void;
  next: () => void;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const data = async (value) => {
    try {
      await AsyncStorage.setItem('token', value);
    } catch (e) {
      console.log('Storage error');
    }
  };

  async function submit() {
    const res = await AuthenticateCredentials(email, password);
    if (res) {
      const myData: UserModel = await res.json();
      data(JSON.stringify(myData));
    }
    // AuthenticateSession('');
  }

  return (
    <Modal
      animationType='none'
      onRequestClose={close}
      visible={visible}
      style={{ width: '100%', alignSelf: 'center', height: '100%' }}
    >
      <ImageBackground source={image} resizeMode='contain'>
        <View style={{ height: '70%', marginTop: 100 }}>
          <TextInput
            placeholder='Email'
            inputMode='email'
            textContentType='emailAddress'
            value={email}
            style={{ width: '60%', backgroundColor: 'grey', alignSelf: 'center', marginTop: 25, padding: 5 }}
            onChangeText={(e) => setEmail(e.trim().toLowerCase())}
          />
          <TextInput
            placeholder='Password'
            secureTextEntry
            textContentType='password'
            value={password}
            style={{
              width: '60%',
              backgroundColor: 'grey',
              alignSelf: 'center',
              marginBottom: 25,
              marginTop: 25,
              padding: 5,
            }}
            onChangeText={(e) => setPassword(e)}
          />

          <Pressable style={{ width: '30%', alignSelf: 'center', backgroundColor: 'blue' }} onPress={() => submit()}>
            <Text style={{ padding: 5, textAlign: 'center' }}> Login </Text>
          </Pressable>
        </View>
        <View style={{ alignSelf: 'center', bottom: 0, height: '5%', position: 'absolute' }}>
          <Pressable onPress={next}>
            <Text>
              Don't have an account yet? <span style={{ color: 'blue' }}>Sign up here!</span>
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
    </Modal>
  );
}
