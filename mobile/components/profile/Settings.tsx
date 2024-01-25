import { useState } from 'react';
import { Modal, View, Text, Image, Pressable } from 'react-native';
import SettingsItem from './SettingsItem';

export default function Settings({ open, close }: { open: boolean; close: () => void }) {
  function test() {}

  return (
    <Modal onRequestClose={() => close} visible={open}>
      <View style={{ width: '100%', height: '100%', backgroundColor: '#292727' }}>
        <View style={{ display: 'flex', flexDirection: 'row', width: '100%', height: '12%' }}>
          <View style={{ width: '100%', height: '100%' }}>
            <Text
              style={{
                height: '100%',
                marginLeft: 24,
                marginTop: 16,
                position: 'relative',
                textAlign: 'center',
                fontSize: 24,
              }}
            >
              Settings
            </Text>
          </View>
          <View style={{ width: '20%', marginLeft: '-20%' }}>
            <Pressable onPress={close}>
              <Image
                source={{ uri: '../../assets/exit-icon.svg' }}
                style={{ width: '25%', height: '50%', margin: 24, alignContent: 'flex-end' }}
              />
            </Pressable>
          </View>
        </View>
        <View style={{ width: '80%', alignSelf: 'center' }}>
          <SettingsItem data={{ title: 'test', does: test, flip: true }} />
        </View>
      </View>
    </Modal>
  );
}
