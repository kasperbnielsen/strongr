import { useState } from 'react';
import { View, Pressable, Text, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import ExerciseItem from './ExerciseItem';
import { exerciseList } from '../../assets/exerciseList';

export default function ExerciseGroup({ group }: { group: string }) {
  const [visibility, setVisibility] = useState<boolean>(false);

  return (
    <View>
      <View>
        <Pressable
          style={{
            backgroundColor: 'white',
            borderColor: 'green',
            borderWidth: 1,
            borderStyle: 'solid',
            margin: 8,
            flex: 1,
            flexDirection: 'row',
            gap: 8,
            paddingVertical: 8,
            paddingHorizontal: 4,
          }}
          onPress={() => {
            setVisibility(!visibility);
          }}
        >
          <Text style={{ textAlign: 'center' }}>{group.charAt(0).toUpperCase() + group.substring(1)}</Text>
          <Image
            style={{ width: 8, height: 8, tintColor: 'black', alignSelf: 'center', right: 10, position: 'absolute' }}
            source={{
              uri: '../../assets/expand.svg',
            }}
          />
        </Pressable>
      </View>
      {visibility ? (
        <FlatList data={exerciseList[group]} renderItem={({ item, index }) => <ExerciseItem exercise={item} />} />
      ) : (
        <View></View>
      )}
    </View>
  );
}
