import { Button } from 'react-native';

export default function SaveWorkoutButton({ onClick }: { onClick: () => void }) {
  return <Button title='Save' onPress={onClick} />;
}
