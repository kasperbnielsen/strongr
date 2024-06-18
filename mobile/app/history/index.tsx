import { useEffect, useState } from 'react';
import { FlatList, View, Text, Pressable, Image } from 'react-native';

import Fab from '../../components/floatingbutton/fab';
import BottomNavBar from '../../components/bottomnavbar/BottomNavBar';
import WorkoutListItem from '../../components/workout/WorkoutListItem';
import WorkoutModal from '../../components/workout/WorkoutModal';
import { getWorkouts } from '../../endpoints/workouts';
import { WorkoutModel } from '../../types';
import { UseDispatch } from '../state';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Settings from '../../components/profile/Settings';

export default function History() {
  const [visible, setVisible] = useState(false);
  const [workouts, setWorkouts] = useState<WorkoutModel[]>();
  const [userid, setUserid] = useState('');
  const [open, setOpen] = useState<boolean>(false);

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

  return (
    <View>
      <View style={{ height: '90%' }}>
        <View style={{ gap: 8, paddingBottom: '20%', backgroundColor: '#292727' }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              margin: 24,
              alignContent: 'center',
            }}
          >
            <View style={{ width: '100%' }}>
              <View style={{ height: '50%' }}>
                <Text style={{ fontSize: 32, color: 'white', textAlign: 'center' }}>Workout History</Text>
              </View>
            </View>
          </View>
          <Settings open={open} close={() => setOpen(false)} />

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
      <BottomNavBar newState={[false, true, false, false]} />
    </View>
  );
}
