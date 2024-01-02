import { View, Text } from 'react-native';

export default function HomeElement() {
  return (
    <View
      style={{
        borderStyle: 'solid',
        borderColor: 'white',
        borderWidth: 5,
        borderRadius: 15,
        height: 150,
        width: '47.5%',
        marginRight: '5%',
      }}
    >
      <Text style={{ color: 'white' }}>placeholder</Text>
    </View>
  );
}
