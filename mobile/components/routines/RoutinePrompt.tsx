import Modal from 'react-native-modal';
import { Pressable, Text, View, Image } from 'react-native';
import { Routines, WorkoutModel } from '../../types';
import { createRoutine } from '../../endpoints/routines';

export default function RoutinePrompt({
  workout,
  close,
  visible,
}: {
  workout: Routines;
  close: () => void;
  visible: boolean;
}) {
  async function createRoutineFromWorkout() {
    await createRoutine(workout.user_id, workout.exercises, workout.title);
  }

  return (
    <Modal isVisible={visible}>
      <View
        style={{
          borderRadius: 8,
          width: '80%',
          backgroundColor: 'white',
          alignSelf: 'center',
          paddingHorizontal: 12,
          paddingVertical: 24,
          gap: 24,
        }}
      >
        <View>
          <Text style={{ fontSize: 16, fontWeight: '600', textAlign: 'center', paddingBottom: 12 }}>
            Save as Routine?
          </Text>
          <Text style={{ textAlign: 'center' }}>
            Save this workout as a Routine, so you can perform it again in the future
          </Text>
        </View>

        <View style={{ gap: 8 }}>
          <Pressable
            style={{ padding: 8, backgroundColor: '#26ebfc', borderRadius: 6 }}
            onPress={() => {
              createRoutineFromWorkout();
              close();
            }}
          >
            <Text style={{ textAlign: 'center', fontWeight: '500' }}>Save as routine</Text>
          </Pressable>
          <Pressable style={{ padding: 8, backgroundColor: 'lightgray', borderRadius: 6 }} onPress={() => close()}>
            <Text style={{ textAlign: 'center', fontWeight: '500' }}>No thanks</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
