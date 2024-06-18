import { View, Text, FlatList } from 'react-native';
import WorkoutModal from './WorkoutModal';
import { useEffect, useState } from 'react';
import { Routines } from '../../types';

export default function TemplateCard({
  title,
  exercises,
}: {
  title: string;
  exercises: { title: string; exercise_id: string }[];
}) {
  return (
    <View
      style={{
        borderStyle: 'solid',
        borderRadius: 8,
        borderColor: 'white',
        borderWidth: 1,
        width: '100%',
        height: 125,
        padding: 8,
        gap: 8,
      }}
    >
      <Text style={{ color: 'white' }}>{title}</Text>
      <FlatList
        style={{ flex: 1 }}
        data={exercises}
        renderItem={({ item, index }) => <Text style={{ color: 'white' }}> {item.title} </Text>}
      />
    </View>
  );
}
