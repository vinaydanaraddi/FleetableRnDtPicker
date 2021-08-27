import moment from 'moment';
import React, {useState, useEffect} from 'react';
import {
  Button,
  Modal,
  SafeAreaView,
  Switch,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import CalendarPicker from './CalendarPicker/index';
import FleetableTimePicker from './FleetableTimePicker';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from './utils/Responsiveness';

const FleetableCalendar = ({
  value,
  minDate,
  maxDate,
  onDateChange,
  showCalendar,
  showHijri,
  showTime,
  hoursLabel,
  minutesLabel,
  calendarContainerStyle,
  calendarSwitchContainerStyle,
  calendarSwitchLabelStyle,
  showCalendarSwitch,
  calendarSwitchLabel,
  onCalendarSwitch,
  selectedDayStyle,
  selectedDayTextStyle,
}) => {
  const [datetime, setDatetime] = useState(value);
  const [isHijri, setIsHijri] = useState(showHijri);

  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);

  useEffect(() => {
    if (showTime) {
      let _time = value ? value : moment();
      const timeArr = _time.format('HH:mm').split(':');
      setHour(parseInt(timeArr[0]));
      setMinute(parseInt(timeArr[1]));
    }
  }, [value, showTime]);

  const onTimeChanged = (type, index) => {
    switch (type) {
      case 'HOUR':
        setHour(parseInt(index));
        break;
      case 'MINUTE':
        setMinute(parseInt(index));
        break;
      default:
        break;
    }
  };

  return (
    <Modal animationType="slide" visible={showCalendar}>
      <SafeAreaView
        style={{...styles.calendarContainerStyle, ...calendarContainerStyle}}>
        <View style={{justifyContent: 'space-between', flex: 1}}>
          <View>
            <CalendarPicker
              minDate={minDate}
              maxDate={maxDate}
              startFromMonday={true}
              showHijri={isHijri}
              onDateChange={date => {
                setDatetime(moment(date));
              }}
              initialDate={datetime ? datetime : moment()}
              selectedStartDate={datetime}
              selectedDayStyle={selectedDayStyle}
              selectedDayTextStyle={selectedDayTextStyle}
            />
            {showCalendarSwitch && (
              <View
                style={{
                  ...styles.calendarSwitchContainerStyle,
                  ...calendarSwitchContainerStyle,
                }}>
                <Text
                  style={{
                    ...styles.calendarSwitchLabelStyle,
                    ...calendarSwitchLabelStyle,
                  }}>
                  {calendarSwitchLabel}
                </Text>
                <Switch
                  onValueChange={value => {
                    if (onCalendarSwitch) {
                      onCalendarSwitch(value);
                    } else {
                      setIsHijri(value);
                    }
                  }}
                  value={isHijri}
                />
              </View>
            )}
          </View>

          {showTime && (
            <FleetableTimePicker
              hourIndex={hour}
              minuteIndex={minute}
              onTimeChanged={onTimeChanged}
              hoursLabel={hoursLabel}
              minutesLabel={minutesLabel}
            />
          )}
          <Button
            onPress={() => {
              const dateTime = moment(datetime);
              if (showTime) {
                dateTime.hours(hour);
                dateTime.minutes(minute);
              }

              if (onDateChange) {
                onDateChange(dateTime);
              }
            }}
            title={'Okay'}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  calendarContainerStyle: {backgroundColor: '#ffffff', flex: 1},
  calendarSwitchContainerStyle: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    borderColor: '#cacaca',
    borderTopWidth: 0.6,
    borderBottomWidth: 0.6,
    padding: hp('1%'),
    margin: hp('1%'),
    marginTop: hp('3%'),
  },
  calendarSwitchLabelStyle: {
    color: '#000000',
    fontSize: hp('2%'),
  },
});

export default FleetableCalendar;
