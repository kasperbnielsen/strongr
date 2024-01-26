import { View, Text } from 'react-native';
import { Switch } from 'tamagui';

export default function SettingsItem({ data }: { data: { title: string; does: () => void; flip: boolean } }) {
  return (
    <View
      style={{
        backgroundColor: 'grey',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        padding: 18,
        borderRadius: 10,
      }}
    >
      <Text style={{ width: '90%' }}>{data.title}</Text>
      {data.flip ? (
        <Switch size='$4' id='id' defaultChecked>
          <Switch.Thumb animation='bouncy' />
        </Switch>
      ) : (
        <View />
      )}
    </View>
  );
}
