import { View, Text, ImageBackground } from 'react-native';

export default function SignupModal({ visibility, close }: { visibility: boolean; close: () => void }) {
  const image = { uri: '../../assets/desktop-bg.svg' };

  return (
    <View>
      <ImageBackground source={image} resizeMode='cover'>
        <Text>Signup</Text>
      </ImageBackground>
    </View>
  );
}
