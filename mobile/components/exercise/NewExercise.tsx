import { Check } from '@tamagui/lucide-icons';
import React, { useState } from 'react';
import { View, Text, Pressable, Modal } from 'react-native';
import { Input, Checkbox, Label, TextArea } from 'tamagui';

import Dropdown from './Dropdown';
import { ExerciseTypes as MuscleGroups } from '../../types';
export default function NewExercise({ visible, close }: { visible: boolean; close: () => void }) {
  const [name, setName] = useState<string>();

  return (
    <Modal
      style={{ alignItems: 'center', display: 'flex', width: '100%', gap: 25 }}
      onRequestClose={close}
      visible={visible}
    >
      <View style={{ flex: 1, alignSelf: 'center', flexDirection: 'row', marginTop: 50, marginBottom: 50 }}>
        <Text style={{ marginRight: 25 }}>Exercise Name</Text>
        <Input size='$4' borderWidth={2} value={name} />
      </View>
      <View style={{ width: 200 }}>
        <Text>Muscle Group</Text>
        <Dropdown data={MuscleGroups} />
      </View>
      <View style={{ display: 'flex', flexDirection: 'row', gap: 25 }}>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 15 }}>
          <Label>Weight</Label>
          <Checkbox>
            <Checkbox.Indicator>
              <Check />
            </Checkbox.Indicator>
          </Checkbox>
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 15 }}>
          <Label>Time</Label>
          <Checkbox>
            <Checkbox.Indicator>
              <Check />
            </Checkbox.Indicator>
          </Checkbox>
        </View>
      </View>
      <View style={{ display: 'flex' }}>
        <Text>Description</Text>
        <TextArea size='$4' borderWidth={2} />
      </View>

      <Pressable
        style={{
          borderColor: 'black',
          borderStyle: 'solid',
          borderWidth: 3,
          borderRadius: 7,
          width: 100,
          height: 'auto',
          backgroundColor: 'grey',
          alignSelf: 'center',
          marginTop: 25,
        }}
      >
        <Text style={{ color: 'blue', alignSelf: 'center' }}>Create</Text>
      </Pressable>
    </Modal>
  );
}
