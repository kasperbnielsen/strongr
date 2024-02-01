import { Button, View } from 'react-native';

export default function SaveWorkoutButton({ onClick }: { onClick: () => void }) {
  return (
    <View style={{ width: '25%', alignSelf: 'center', margin: 24 }}>
      <Button title='Save' onPress={onClick} />
    </View>
  );
}
