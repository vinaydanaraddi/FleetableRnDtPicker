import moment from 'moment';
import React, {useState} from 'react';
import {Button, Modal, SafeAreaView, Switch, Text, View} from 'react-native';
import CalendarPicker from './CalendarPicker/index';
import FleetableTimePicker from './FleetableTimePicker';
const FleetableCalendar = ({
  value = '10/10/2020',
  minDate,
  maxDate,
  onDateChange,
}) => {
  let datetime = moment(value);
  const [showDateTimePicker, setDateTimePicker] = useState(false);
  const [isHijri, setIsHijri] = useState(false);

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
              showHijri={isHijri}
              onDateChange={date => {
                datetime = moment(date);
              }}
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
              <Switch onValueChange={setIsHijri} value={isHijri} />
              <Text style={{marginLeft: 5, color: '#000000'}}>
                Display Hijri Calendar
              </Text>
            </View>
            <FleetableTimePicker />
            <Button
              onPress={() => {
                onDateChange && onDateChange(datetime);
                setDateTimePicker(!showDateTimePicker);
              }}
              title="Okay"
            />
          </View>
        </SafeAreaView>
      </Modal>
      <Button
        title={datetime.format('DD/MM/YYYY')}
        onPress={() => setDateTimePicker(!showDateTimePicker)}
      />
    </View>
  );
};

export default FleetableCalendar;
