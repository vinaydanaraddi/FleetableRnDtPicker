import React from 'react';
import {useEffect, useState} from 'react';
import {View, Button} from 'react-native';
import CalendarPicker from './CalendarPicker/index';
import HijriUtils from '@date-io/hijri';
import DatePicker, {getFormatedDate} from './rn-modern-picker/index';

const momentGregorian = require('moment');
const momentHijri = require('moment-hijri');

const FleetableCalendar = ({value, minDate, maxDate, isGregorian}) => {
  return (
    <View>
      {/* <CalendarPicker showHijri={!isGregorian} initialDate={new Date()} /> */}

      {isGregorian ? (
        <DatePicker
          options={{
            backgroundColor: '#090C08',
            textHeaderColor: '#FFA25B',
            textDefaultColor: '#F6E7C1',
            selectedTextColor: '#fff',
            mainColor: '#F4722B',
            textSecondaryColor: '#D6C7A1',
            borderColor: 'rgba(122, 146, 165, 0.1)',
          }}
          selected={getFormatedDate(new Date(), 'YYYY-MM-DD')}
        />
      ) : (
        <DatePicker
          options={{
            backgroundColor: '#090C08',
            textHeaderColor: '#FFA25B',
            textDefaultColor: '#F6E7C1',
            selectedTextColor: '#fff',
            mainColor: '#F4722B',
            textSecondaryColor: '#D6C7A1',
            borderColor: 'rgba(122, 146, 165, 0.1)',
          }}
          selected={getFormatedDate(new Date(), 'iYYYY-iMM-iDD')}
          isGregorian={false}
        />
      )}
    </View>
  );
};

export default FleetableCalendar;
