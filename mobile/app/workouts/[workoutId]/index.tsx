import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

export default function WorkoutPage() {
  const { workoutId } = useLocalSearchParams();

  return <Text>Workout page: {workoutId}</Text>;
}
