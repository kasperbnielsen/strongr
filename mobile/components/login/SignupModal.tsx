import { HttpStatusCode } from 'axios';
import { useState } from 'react';
import { View, Text, ImageBackground, Modal, TextInput, Pressable } from 'react-native';

import { signUp } from '../../endpoints/users';

export default function SignupModal({ navigation }) {
  const image = { uri: '../../assets/desktop-bg.svg' };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit() {
    const status = await signUp(email, password);
    if (status['status'] === 200) {
      navigation.navigate('Login');
    }
  }

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
            <Text style={{ padding: 5, textAlign: 'center' }}> Sign up </Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}
