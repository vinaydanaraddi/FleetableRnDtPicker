import React, {useState, useEffect} from 'react';
import FleetableCalendar from './src/FleetableCalendar';
import moment from 'moment';

// selectedDate => Date or Moment Date
// minDate => Date or Moment Date
// maxDate => Date or Moment Date
// onDateChange => Function which gives Date onChange
// showCalendar => Boolean,
// showHijri => Boolean,
// showTime => Boolean,
// hoursLabel => Text,
// minutesLabel => Text,
// calendarContainerStyle => TextStyle styles,
// calendarSwitchContainerStyle => TextStyle styles,
// calendarSwitchLabelStyle => TextStyle styles,
// calendarSwitch => Boolean,
// calendarSwitchLabel => Text,
// onCalendarSwitch => Function,
// selectedDayStyle => TextStyle styles,
// selectedDayTextStyle => TextStyle styles,
// previousTitle => Text,
// nextTitle => Text,
// selectMonthTitle => Text,
// selectYearTitle => Text,

const App = ({
  selectedDate = moment(),
  showCalendar = true,
  minDate,
  maxDate,
  onDateChange,
  showHijri,
  showTime = true,
  hoursLabel = 'Hours',
  minutesLabel = 'Minutes',

  calendarContainerStyle = undefined,
  calendarSwitchContainerStyle = undefined,
  calendarSwitchLabelStyle = undefined,
  showCalendarSwitch = true,
  calendarSwitchLabel = 'Display Hijri Calendar',
  onCalendarSwitch = undefined,

  selectedDayStyle = undefined,
  selectedDayTextStyle = undefined,

  previousTitle = 'Previous',
  nextTitle = 'Next',
  selectMonthTitle = 'Select Month in ',
  selectYearTitle = 'Select Year',
}) => {
  const [value, setValue] = useState(moment(selectedDate));
  const [showDateTimePicker, setDateTimePicker] = useState(showCalendar);

  useEffect(() => {
    console.log('value ', value);
  }, [value]);

  const _onDateChange = dateTime => {
    setValue(dateTime);
    if (onDateChange) {
      onDateChange(dateTime);
    }
    setDateTimePicker(!showDateTimePicker);
  };

  return (
    <FleetableCalendar
      value={value}
      showCalendar={showDateTimePicker}
      minDate={minDate}
      maxDate={maxDate}
      onDateChange={_onDateChange}
      showHijri={showHijri}
      showTime={showTime}
      hoursLabel={hoursLabel}
      minutesLabel={minutesLabel}
      calendarContainerStyle={calendarContainerStyle}
      calendarSwitchContainerStyle={calendarSwitchContainerStyle}
      calendarSwitchLabelStyle={calendarSwitchLabelStyle}
      showCalendarSwitch={showCalendarSwitch}
      calendarSwitchLabel={calendarSwitchLabel}
      onCalendarSwitch={onCalendarSwitch}
      selectedDayStyle={selectedDayStyle}
      selectedDayTextStyle={selectedDayTextStyle}
      previousTitle={previousTitle}
      nextTitle={nextTitle}
      selectMonthTitle={selectMonthTitle}
      selectYearTitle={selectYearTitle}
    />
  );
};

export default App;
