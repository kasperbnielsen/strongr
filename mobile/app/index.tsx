import { View, Text } from 'react-native';

import WorkoutModal from '../components/workout/WorkoutModal';

export default function HomePage() {
  return (
    <View style={{ height: '100%', width: '100%' }}>
      <Text>HomePage</Text>

      <WorkoutModal />
    </View>
  );
}
