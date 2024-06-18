import { Text, View, Image } from 'react-native';

export default function ExerciseItem({ exercise }: { exercise: string }) {
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Text>{exercise}</Text>
      <Image
        style={{ width: 24, height: 24, alignSelf: 'center', paddingTop: 10, tintColor: 'white' }}
        source={{
          uri: '../../assets/open.svg',
        }}
      />
    </View>
  );
}
