import { Link } from 'expo-router';
import { View, Text, Image } from 'react-native';

export default function NavItem(state: boolean[], clickNav: (n: number) => void, title: string, uri: string) {
  return (
    <Link
      style={{ width: '20%', backgroundColor: state[3] ? 'green' : 'blue', display: 'flex' }}
      onPress={() => {
        clickNav;
      }}
      href=''
    >
      <View style={{ width: '100%' }}>
        <Image
          style={{ width: '100%', height: '65%' }}
          source={{
            uri,
          }}
        />
        <Text style={{ width: '100%', textAlign: 'center', height: '35%', fontSize: 12 }}>{title}</Text>
      </View>
    </Link>
  );
}
