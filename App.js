import React, {useState} from 'react';
import {View, Switch} from 'react-native';
import FleetableCalendar from './src/FleetableCalendar';
import {NativeBaseProvider, Box} from 'native-base';
import {useEffect} from 'react';
import moment from 'moment';

const App = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [value, setValue] = useState(moment());

  return (
    <View style={{marginTop: '20%'}}>
      <Switch
        onValueChange={setShowCalendar}
        value={showCalendar}
        style={{marginBottom: 20}}
      />
      <FleetableCalendar
        showCalendar={showCalendar}
        onDateChange={setValue}
        value={value}
      />
    </View>
  );
};

export default App;
