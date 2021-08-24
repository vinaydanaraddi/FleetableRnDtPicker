import React, {useState} from 'react';
import {View, Switch} from 'react-native';
import FleetableCalendar from './src/FleetableCalendar';
import {NativeBaseProvider, Box} from 'native-base';
import {useEffect} from 'react';

const App = () => {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <View style={{marginTop: '20%'}}>
      <Switch
        onValueChange={setShowCalendar}
        value={showCalendar}
        style={{marginBottom: 20}}
      />
      <FleetableCalendar showCalendar={showCalendar} />
    </View>
  );
};

export default App;
