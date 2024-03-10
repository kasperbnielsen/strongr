import { useEffect, useState } from 'react';
import { Text, View, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { getExerciseList } from '../../endpoints/exercises';
import { ExerciseModel, WorkoutModel } from '../../types';
import { Line } from 'react-native-svg';

export default function WorkoutListItem({ workout, seperator }: { workout: WorkoutModel; seperator: boolean }) {
  const [names, setNames] = useState<ExerciseModel[]>([]);

  async function getNames() {
    const list = [];
    workout.exercises.forEach((element) => {
      list.push(element.exercise_id.$oid);
    });
    const result = await getExerciseList(list);

    return result;
  }

  function formatTime() {
    let time = new Date(workout.finished_at).getTime() - new Date(workout.started_at).getTime();

    const hours = Math.floor(time / 3600000).toString();
    const minutes = Math.floor((time % 3600000) / 60000).toString();
    const seconds: string = Math.floor(((time % 3600000) % 60000) / 6000).toString();

    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds.padStart(2, '0')}`;
  }

  useEffect(() => {
    getNames().then(setNames);
  }, []);

  return (
    <View>
      {seperator === true ? (
        <View style={{ flex: 1, flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
          <View
            style={{
              borderStyle: 'solid',
              borderWidth: 1,
              width: '30%',
              height: 1,
              alignSelf: 'center',
              borderColor: 'gray',
            }}
          />
          <Text style={{ alignSelf: 'center', padding: 5, color: 'gray' }}>
            {new Date(workout.started_at).toDateString()}
          </Text>
          <View
            style={{
              borderStyle: 'solid',
              borderWidth: 1,
              width: '30%',
              height: 1,
              alignSelf: 'center',
              borderColor: 'gray',
            }}
          />
        </View>
      ) : (
        <></>
      )}
      <View
        style={{
          backgroundColor: 'gray',
          marginVertical: 8,
          width: '66%',
          minHeight: 100,
          borderRadius: 5,
          alignSelf: 'center',
        }}
      >
        <View style={{ margin: 10, gap: 10 }}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Text style={{ width: '65%' }}>{workout.title}</Text>
            <View style={{ width: '35%', flex: 1, flexDirection: 'row' }}>
              <Image
                source={{ uri: '../../assets/timer.svg' }}
                style={{ width: 16, height: 16, alignSelf: 'center', marginRight: 6 }}
              />
              <Text>{formatTime()}</Text>
            </View>
          </View>
          <Text style={{ fontWeight: '600' }}>Exercises:</Text>
          <View style={{ display: 'flex', flexDirection: 'row', gap: 24 }}>
            <FlatList
              style={{ width: '80%' }}
              data={names}
              keyExtractor={(item) => item.title}
              renderItem={({ item, index }) => <Text>{`${workout.exercises[index].sets.length}x ${item.title}`}</Text>}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
