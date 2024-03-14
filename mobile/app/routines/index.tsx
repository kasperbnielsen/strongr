import { View, Text } from 'react-native';
import BottomNavBar from '../../components/navbar/BottomNavBar';
import { useState } from 'react';
import WorkoutModal from '../../components/workout/WorkoutModal';
import { UseDispatch } from '../state';
import Fab from '../../components/floatingbutton/fab';

export default function Routines() {
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
    <View style={{backgroundColor: '#292727', height: '100%'}}>
      <View style={{ height: '90%' }}>
        <Text>Hey</Text>
      </View>
      <BottomNavBar newState={[false, true, false, false, false]} />
      <Fab open={() => setVisible(true)} />
      {openWorkout()}
    </View>
  );
}
