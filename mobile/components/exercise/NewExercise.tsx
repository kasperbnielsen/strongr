import { useState } from 'react';
import { TextInput, View, Text, Pressable } from 'react-native';
import Dropdown from './Dropdown';

export default function NewExercise() {
  const [name, setName] = useState<string>();
  const [visible, setVisible] = useState<boolean>();

  return (
    <View style={{}}>
      <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'row', marginTop: 50 }}>
        <Text style={{ marginRight: 25 }}>Title</Text>
        <TextInput style={{ height: 25, width: 200, backgroundColor: 'green' }} value={name} />
      </View>
      <View>
        <Text>Type</Text>
        <Pressable
          onPress={() => setVisible(!visible)}
          style={{ borderStyle: 'solid', borderColor: 'black', borderWidth: 5 }}
        >
          <Text>Press me</Text>
        </Pressable>
        <Dropdown visibility={visible} />
      </View>
      <Pressable
        style={{
          borderColor: 'black',
          borderStyle: 'solid',
          borderWidth: 3,
          width: 100,
          height: 'auto',
          backgroundColor: 'grey',
          alignSelf: 'center',
          marginTop: 25,
        }}
      >
        <Text style={{ color: 'blue', alignSelf: 'center' }}>Create</Text>
      </Pressable>
    </View>
  );
}
