import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { TextInput, View, Text, Pressable, Modal, ImageBackground, Button } from 'react-native';

import { AuthenticateCredentials } from '../../endpoints/authentication';
import { UserModel } from '../../types';
import SignupModal from './SignupModal';
const image = { uri: '../../assets/desktop-bg.svg' };

export default function LoginModal({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [model, setModel] = useState<UserModel>(null);

  async function submit() {
    const res = await AuthenticateCredentials(email, password);
    setModel(res.data);
  }

  const getStorage = async () => {
    try {
      await AsyncStorage.setItem('token', model.token);
      await AsyncStorage.setItem('userid', model.model._id.$oid);
      await AsyncStorage.setItem('useremail', model.model.email);
      await AsyncStorage.setItem('userfirstname', model.model.first_name);
      await AsyncStorage.setItem('userlastname', model.model.last_name);
      await AsyncStorage.setItem('refresh', model.refresh);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (model !== null) {
      getStorage().then(() => window.location.reload());
    }
  }, [model]);

  return (
    <ImageBackground source={image} resizeMode='cover' style={{ height: '100%' }}>
      <View style={{ width: '100%', alignSelf: 'center', height: '100%' }}>
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
          <Pressable onPress={() => navigation.navigate('Signup')}>
            <Text>
              Don't have an account yet? <span style={{ color: 'blue' }}>Sign up here!</span>
            </Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}
