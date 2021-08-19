import React from 'react';
import {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import CalendarPicker from './CalendarPicker/index';
import HijriUtils from '@date-io/hijri';

const momentGregorian = require('moment');
const momentHijri = require('moment-hijri');

const FleetableCalendar = ({value, minDate, maxDate}) => {
  const [hijriDate, setHijriDate] = useState(undefined);
  useEffect(() => {
    const hijri = momentHijri(momentHijri().format('iYYYY-iMM-iDD'));

    console.log(
      '🚀 ~ file: FleetableCalendar.js ~ line 13 ~ useEffect ~ hijri',
      hijri,
    );
    const date = hijri.toDate();
    console.log(
      '🚀 ~ file: FleetableCalendar.js ~ line 20 ~ useEffect ~ date',
      date,
    );

    setHijriDate(hijri);
  }, [value]);

  const onDateChange = date => {
    console.log(
      '🚀 ~ file: FleetableCalendar.js ~ line 21 ~ onDateChange ~ date',
      date,
    );
  };

  return (
    <View>
      {hijriDate ? (
        <CalendarPicker
          showHijri
          initialDate={new Date()}
          onDateChange={onDateChange}
        />
      ) : undefined}
    </View>
  );
};

export default FleetableCalendar;
