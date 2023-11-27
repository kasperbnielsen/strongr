import { ImageBackground, ImageBase, Text, View } from 'react-native';

import LoginModal from '../../components/login/LoginModal';

export default function LoginPage() {
  return (
    <View style={{ height: '100%' }}>
      <Text style={{ height: '25%', alignSelf: 'center', fontSize: 26, paddingTop: 50, color: 'white' }}> Login </Text>
      <LoginModal />
    </View>
  );
}
