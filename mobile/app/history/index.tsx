import { View, Text } from 'tamagui';
import BottomNavBar from '../../components/navbar/BottomNavBar';

export default function History() {
  return (
    <View>
      <View style={{ height: '90%' }}>
        <Text>Heyt</Text>
      </View>
      <BottomNavBar newState={[false, false, false, true, false]} />
    </View>
  );
}
