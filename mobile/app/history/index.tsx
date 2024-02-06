import { View, Text } from 'tamagui';
import BottomNavBar from '../../components/navbar/BottomNavBar';
import WorkoutModal from '../../components/workout/WorkoutModal';
import { useState } from 'react';
import { UseDispatch } from '../state';
import Fab from '../../components/floatingbutton/fab';

export default function History() {
  const [visible, setVisible] = useState(false);

  const dispatcher = new UseDispatch();

  function openWorkout() {
    return dispatcher.getState().workouts !== null ? (
      <WorkoutModal visible={visible} close={() => setVisible(false)} workouts={dispatcher.getState().workouts} />
    ) : (
      <></>
    );
  }
  return (
    <View>
      <View style={{ height: '90%' }}>
        <Text>Heyt</Text>
      </View>
      <Fab open={() => setVisible(true)} />
      {openWorkout()}
      <BottomNavBar newState={[false, false, false, true, false]} />
    </View>
  );
}
