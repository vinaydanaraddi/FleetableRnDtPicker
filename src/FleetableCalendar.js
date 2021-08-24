import moment from 'moment';
import React, {useState, useEffect} from 'react';
import {View, Switch, Text, Modal, SafeAreaView, Button} from 'react-native';
import CalendarPicker from './CalendarPicker/index';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useRef} from 'react';

const momentGregorian = require('moment');
const momentHijri = require('moment-hijri');

const FleetableCalendar = ({value = '10/10/2020', minDate, maxDate}) => {
  const [showDateTimePicker, setDateTimePicker] = useState(false);
  const [isGregorian, setIsGregorian] = useState(true);

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={showDateTimePicker}>
        <SafeAreaView>
          <View>
            <CalendarPicker
              minDate={minDate}
              maxDate={maxDate}
              startFromMonday={true}
              showHijri={!isGregorian}
              initialDate={value ? moment(value) : moment()}
              selectedStartDate={moment(value)}
            />
            <View
              style={{
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center',
                marginLeft: 20,
                marginTop: 10,
              }}>
              <Switch onValueChange={setIsGregorian} value={isGregorian} />
              <Text style={{marginLeft: 5}}>Display Hijri Calendar</Text>
            </View>
            <Button
              onPress={() => setDateTimePicker(!showDateTimePicker)}
              title="Learn More"
            />
          </View>
        </SafeAreaView>
      </Modal>
      <Button
        onPress={() => setDateTimePicker(!showDateTimePicker)}
        title="Learn More"
      />
    </View>
  );
};

export default FleetableCalendar;
