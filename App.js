import React from 'react';
import {View} from 'react-native';
import FleetableCalendar from './src/FleetableCalendar';
import {NativeBaseProvider, Box} from 'native-base';

const App = () => {
  return (
    <NativeBaseProvider>
      <View style={{marginTop: '20%'}}>
        <FleetableCalendar />
      </View>
    </NativeBaseProvider>
  );
};

export default App;
