import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {WheelPicker} from 'react-native-wheel-picker-android';
import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from './utils/Responsiveness';

const FleetableTimePicker = ({
  hourIndex,
  minuteIndex,
  onTimeChanged,
  hoursLabel,
  minutesLabel,
}) => {
  const hoursList = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
  ];
  const minutesList = [
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '24',
    '25',
    '26',
    '27',
    '28',
    '29',
    '30',
    '31',
    '32',
    '33',
    '34',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '41',
    '42',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
  ];

  return (
    <View style={styles.timeSlotsContainer}>
      <View style={styles.singleTimeSlotContainer}>
        <Text style={styles.timeSlotLabel}>{hoursLabel}</Text>
        <View style={styles.wheeler}>
          <WheelPicker
            selectedItem={hourIndex}
            data={hoursList}
            onItemSelected={index => {
              onTimeChanged('HOUR', index);
            }}
            itemTextSize={20}
          />
        </View>
      </View>
      <View style={styles.singleTimeSlotContainer}>
        <Text style={styles.timeSlotLabel}>{minutesLabel}</Text>
        <View style={styles.wheeler}>
          <WheelPicker
            selectedItem={minuteIndex}
            data={minutesList}
            onItemSelected={index => {
              onTimeChanged('MINUTE', index);
            }}
            itemTextSize={20}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  timeSlotsContainer: {
    borderRadius: hp('1%'),
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeSlotLabel: {
    fontSize: hp('2%'),
    color: '#000000',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  singleTimeSlotContainer: {
    marginHorizontal: wp('1%'),
    alignSelf: 'center',
  },
  wheeler: {
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FleetableTimePicker;
