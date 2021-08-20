import React, {useState} from 'react';
import {View, Button} from 'react-native';
import FleetableCalendar from './src/FleetableCalendar';
import {NativeBaseProvider, Box} from 'native-base';

const App = () => {
  const [isGregorian, setIsGregorian] = useState(true);
  return (
    <View style={{marginTop: '20%'}}>
      <FleetableCalendar isGregorian={isGregorian} />
      <Button title="Hijri" onPress={() => setIsGregorian(false)} />
      <Button title="Gregorian" onPress={() => setIsGregorian(true)} />
    </View>
  );
};

export default App;
