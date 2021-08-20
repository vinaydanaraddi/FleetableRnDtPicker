import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Utils} from './Utils';
import {default as momentHijri} from 'moment-hijri';
import moment from 'moment';

export default function Month(props) {
  const {
    months,
    currentMonth: month,
    currentYear: year,
    styles,
    onSelectMonth,
    textStyle,
    minDate,
    maxDate,
    showHijri,
  } = props;

  // const MONTHS = months || showHijri ? Utils.HIJRI_MONTHS : Utils.MONTHS; // English/Arabic Month Array
  const MONTHS = showHijri ? Utils.HIJRI_MONTHS : Utils.MONTHS;
  const hijriMonth = momentHijri(
    moment({year: year, month: month, day: 19}),
  ).format('iMM');
  const monthName = MONTHS[showHijri ? parseInt(hijriMonth) - 1 : month];

  let monthOutOfRange;
  let monthIsBeforeMin = false;
  let monthIsAfterMax = false;
  let monthIsDisabled = false;

  // Check whether month is outside of min/max range.
  if (maxDate && maxDate.year() === year) {
    monthIsAfterMax = month > maxDate.month();
  }
  if (minDate && minDate.year() === year) {
    monthIsBeforeMin = month < minDate.month();
  }

  // ToDo: disabledMonths props to disable months separate from disabledDates

  monthOutOfRange = monthIsAfterMax || monthIsBeforeMin || monthIsDisabled;

  const onSelect = () => {
    let _year = year;
    if (minDate && year < minDate.year()) {
      _year = minDate.year();
    }
    if (maxDate && year > maxDate.year()) {
      _year = maxDate.year();
    }
    onSelectMonth({month, year: _year});
  };

  return (
    <View style={[styles.monthContainer]}>
      {!monthOutOfRange ? (
        <TouchableOpacity onPress={onSelect}>
          <Text style={[styles.monthText, textStyle]}>{monthName}</Text>
        </TouchableOpacity>
      ) : (
        <Text style={[textStyle, styles.disabledText]}>{monthName}</Text>
      )}
    </View>
  );
}

Month.propTypes = {
  styles: PropTypes.shape({}),
  currentMonth: PropTypes.number,
  currentYear: PropTypes.number,
  onSelectMonth: PropTypes.func,
};
