import { View, Text, ImageBackground } from 'react-native';

import HomeElement from './HomeElement';

const image = { uri: '../assets/desktop-bg.svg' };

export default function Summary() {
  return (
    <View style={{ height: '100%', margin: 25 }}>
      <View
        style={{
          borderStyle: 'solid',
          borderColor: 'black',
          borderWidth: 5,
          borderRadius: 15,
          height: 150,
        }}
      >
        <Text>Latest workout? or some summary of some kind</Text>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', marginTop: 25 }}>
        <HomeElement />
        <HomeElement />
      </View>
      <View style={{ flex: 1, flexDirection: 'row', marginTop: 25 }}>
        <HomeElement />
        <HomeElement />
      </View>
      <View style={{ flex: 1, flexDirection: 'row', marginTop: 25 }}>
        <HomeElement />
        <HomeElement />
      </View>
      <View style={{ flex: 1, flexDirection: 'row', marginTop: 25 }}>
        <HomeElement />
        <HomeElement />
      </View>
      <View style={{ flex: 1, flexDirection: 'row', marginTop: 25 }}>
        <HomeElement />
        <HomeElement />
      </View>
    </View>
  );
}
