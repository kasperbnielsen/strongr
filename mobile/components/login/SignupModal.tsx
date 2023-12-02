import { View, Text, ImageBackground, Modal } from 'react-native';

export default function SignupModal({ visible, close }: { visible: boolean; close: () => void }) {
  const image = { uri: '../../assets/desktop-bg.svg' };

  return (
    <ImageBackground source={image} resizeMode='cover' style={{ height: '100%' }}>
      <View style={{ height: '100%' }}>
        <Text>hello</Text>
      </View>
    </ImageBackground>
  );
}
