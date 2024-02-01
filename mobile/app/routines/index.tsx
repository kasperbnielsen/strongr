import { View, Text } from 'react-native';
import BottomNavBar from '../../components/navbar/BottomNavBar';

export default function Routines() {
  return (
    <View>
      <View style={{ height: '90%' }}>
        <Text>Hey</Text>
      </View>
      <BottomNavBar newState={[false, true, false, false, false]} />
    </View>
  );
}
