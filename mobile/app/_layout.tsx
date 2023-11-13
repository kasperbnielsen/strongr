import { Slot } from 'expo-router';

import BottomNavBar from '../components/navbar/BottomNavBar';

export default function HomeLayout() {
  return (
    <>
      <Slot />
      <BottomNavBar />
    </>
  );
}
