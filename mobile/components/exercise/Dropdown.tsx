import { View, Text } from 'react-native';

export default function Dropdown({ visibility }: { visibility: boolean }) {
  return (
    <View style={{ display: visibility ? 'flex' : 'none' }}>
      <Text>Hello</Text>
    </View>
  );
}
