import { useEffect, useState } from 'react';
import { FlatList, View, Text } from 'react-native';

import Fab from '../../components/floatingbutton/fab';
import BottomNavBar from '../../components/navbar/BottomNavBar';
import WorkoutListItem from '../../components/workout/WorkoutListItem';
import WorkoutModal from '../../components/workout/WorkoutModal';
import { getWorkouts } from '../../endpoints/workouts';
import { WorkoutModel } from '../../types';
import { UseDispatch } from '../state';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function History() {
  const [visible, setVisible] = useState(false);
  const [workouts, setWorkouts] = useState<WorkoutModel[]>();
  const [userid, setUserid] = useState('');

  const dispatcher = new UseDispatch();

  async function getUserid() {
    await AsyncStorage.getItem('userid').then((id) => setUserid(id || 'kasper'));
  }

  useEffect(() => {
    try {
      getWorkouts(userid).then(setWorkouts);
    } catch (e) {}
  }, [userid]);
  useEffect(() => {
    getUserid();
  }, []);

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
        <View style={{ gap: 8, paddingBottom: '20%', backgroundColor: '#292727' }}>
          <Text style={{ fontSize: 32, alignSelf: 'center', color: 'white', padding: 8 }}>Workout History</Text>

          <FlatList
            style={{}}
            data={workouts?.reverse()}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => (
              <WorkoutListItem
                workout={item}
                seperator={
                  index === 0
                    ? true
                    : workouts
                        .slice(0, index)
                        .find(
                          (val) => new Date(val.started_at).toDateString() === new Date(item.started_at).toDateString()
                        ) === undefined
                }
              />
            )}
          />
        </View>
      </View>
      <Fab open={() => setVisible(true)} />
      {openWorkout()}
      <BottomNavBar newState={[false, false, false, true, false]} />
    </View>
  );
}
