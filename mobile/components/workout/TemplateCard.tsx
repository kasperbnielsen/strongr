import { View, Text, FlatList } from 'react-native';

export default function TemplateCard({ title, exercises }: { title: string; exercises: string[] }) {
  return (
    <View
      style={{
        borderStyle: 'solid',
        borderRadius: 8,
        borderColor: 'black',
        borderWidth: 2,
        width: '45%',
        height: 125,
        padding: 8,
        gap: 8,
        backgroundColor: 'grey',
        margin: 4,
      }}
    >
      <Text>{title}</Text>
      <FlatList style={{ flex: 1 }} data={exercises} renderItem={({ item, index }) => <Text> {item} </Text>} />
    </View>
  );
}
