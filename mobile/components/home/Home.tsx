import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, Pressable, FlatList } from 'react-native';

import { UseDispatch } from '../../app/state';
import { getRoutines } from '../../endpoints/routines';
import { getLastestWorkout } from '../../endpoints/workouts';
import { Routines, RoutinesInput } from '../../types';
import BottomNavBar from '../bottomnavbar/BottomNavBar';
import BarGraph from '../charts/BarGraph';
import NewRoutine from '../routines/NewRoutine';
import RoutinePrompt from '../routines/RoutinePrompt';
import TemplateCard from '../workout/TemplateCard';
import WorkoutModal from '../workout/WorkoutModal';

export default function Home({ navigation }) {
  const [username, setUsername] = useState<string>();

  const getUsername = async () => {
    const name = await AsyncStorage.getItem('userfirstname');
    setUsername(name);
  };
  const [userid, setUserid] = useState('');
  const [templates, setTemplates] = useState<RoutinesInput>();
  const [isRoutine, setIsRoutine] = useState<{ isVisible: boolean; index: number }>({ isVisible: false, index: -1 });
  const [desiredRoutine, setDesiredRoutine] = useState<Routines>();
  const [workouts, setWorkouts] = useState(null);
  const [routineVisible, setRoutineVisible] = useState(false);
  const [promptVisible, setPromptVisible] = useState(false);
  const [savedVisible, setSavedVisible] = useState(false);
  const [lastWorkout, setLastWorkout] = useState('');

  const dispatcher = new UseDispatch();

  async function getR() {
    return await getRoutines(await AsyncStorage.getItem('userid'));
  }
  async function getUser() {
    return await AsyncStorage.getItem('userid');
  }

  async function getLastWorkout() {
    const workout = await getLastestWorkout(userid);
    setLastWorkout(workout);
  }

  async function doThis() {
    await getUsername();
    await AsyncStorage.getItem('userid').then((id) => setUserid(id || 'kasper'));
  }

  function formatDate() {
    const current = new Date(Date.parse(lastWorkout));
    const day = new Date(Date.parse(lastWorkout)).toLocaleString('en-us', { weekday: 'long' });

    const daysSince = (new Date().getTime() - current.getTime()) / 1000 / 60 / 60 / 24;

    if (daysSince < 6) return day;
    else if (daysSince > 6 && current.getDay() < 13) return 'Last '.concat(day);
    else return current.toUTCString().slice(0, 16);
  }

  function formatExercises(exercises: Routines['exercises']) {
    const tempList = [];
    exercises?.forEach((val, index) => {
      tempList.push({
        exercise_id: { $oid: exercises[index].exercise_id },
        note: '',
        sets: [
          { set_type: 'DropSet', weight: 0, time: 0, reps: 0 },
          { set_type: 'DropSet', weight: 0, time: 0, reps: 0 },
          { set_type: 'DropSet', weight: 0, time: 0, reps: 0 },
        ],
      });
    });
    console.log(tempList);

    return tempList;
  }

  useEffect(() => {
    getR().then(setTemplates);
    getUser().then(setUserid);
    doThis();
  }, []);

  useEffect(() => {
    try {
      getLastWorkout();
    } catch (err) {
      console.error(err);
    }
  }, [userid]);

  useEffect(() => {
    getUsername();
  });
  return (
    <View style={{ height: '100%', backgroundColor: '#292727', width: '100%' }}>
      <RoutinePrompt visible={promptVisible} workout={workouts} close={() => setPromptVisible(false)} />

      <ScrollView style={{ height: '100%', width: '100%' }}>
        <View>
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
                <Text
                  style={{ fontSize: 22, justifyContent: 'center', display: 'flex', color: 'white', height: '100%' }}
                >
                  {' '}
                  {username}{' '}
                </Text>
                <Text
                  style={{ fontSize: 16, justifyContent: 'center', display: 'flex', color: 'white', height: '100%' }}
                >
                  Last workout: {formatDate()}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <BarGraph
          size={15}
          dataPoints={[
            { name: 'test1', value: 4 },
            { name: 'testg', value: 12 },
            { name: 'gfd', value: 1 },
            { name: 'gfd', value: 9 },
            { name: 'sfd', value: 3 },
            { name: 'dsa', value: 7 },
          ]}
          title='Test Graph'
        />

        <NewRoutine userId={userid} visible={routineVisible} close={() => setRoutineVisible(false)} />
        <View style={{ padding: 24, gap: 12, alignSelf: 'center', width: '100%' }}>
          <View style={{ flex: 1, flexDirection: 'row', width: '95%', alignSelf: 'center' }}>
            <Text style={{ fontSize: 24, color: 'white', width: '75%', alignSelf: 'center' }}>Routines</Text>
            <Pressable
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                width: '25%',
              }}
              onPress={() => setRoutineVisible(true)}
            >
              <Text style={{ color: 'white', fontWeight: '600', alignSelf: 'center' }}> New</Text>
              <Image
                style={{ width: 16, height: 16, tintColor: 'white', alignSelf: 'center' }}
                source={{ uri: '../../assets/plus.svg' }}
              />
            </Pressable>
          </View>
          <FlatList
            data={templates?.list}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => {
                  setDesiredRoutine({ user_id: userid, title: item.title, exercises: item.exercises });
                  setIsRoutine({ isVisible: true, index });
                }}
                style={{ width: '95%', margin: '2.5%' }}
              >
                <TemplateCard title={templates?.list[index].title} exercises={item.exercises} />
              </Pressable>
            )}
            style={{ width: '100%' }}
          />
          <WorkoutModal
            visible={isRoutine.isVisible}
            close={() => setIsRoutine({ isVisible: false, index: isRoutine.index })}
            workouts={{
              _id: '',
              user_id: desiredRoutine?.user_id,
              title: desiredRoutine?.title,
              note: '',
              exercises: formatExercises(desiredRoutine?.exercises),
              started_at: new Date(),
              finished_at: new Date(),
            }}
            getSavedWorkout={(workout: Routines) => {
              setWorkouts(workout);
              setPromptVisible(true);
            }}
            isRoutine
          />
        </View>
      </ScrollView>
      <BottomNavBar newState={[true, false, false, false]} />
    </View>
  );
}
