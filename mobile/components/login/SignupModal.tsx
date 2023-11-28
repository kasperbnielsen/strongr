import { View, Text, ImageBackground, Modal } from 'react-native';

export default function SignupModal({ visible, close }: { visible: boolean; close: () => void }) {
  const image = { uri: '../../assets/desktop-bg.svg' };

  return (
    <Modal animationType='none' onRequestClose={close} visible={visible} style={{ height: '100%' }}>
      <ImageBackground source={image} resizeMode='cover'>
        <Text>Signup</Text>
        <Text>Hello</Text>
      </ImageBackground>
    </Modal>
  );
}
