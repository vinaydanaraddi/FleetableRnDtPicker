// Parent view for Month selector

import React, {Component} from 'react';
import {View} from 'react-native';
import MonthsGridView from './MonthsGridView';
import MonthsHeader from './MonthsHeader';
import {default as momentHijri} from 'moment-hijri';

export default class MonthSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentYear: props.currentYear,
    };
  }

  render() {
    const {
      showHijri,
      styles,
      textStyle,
      title,
      headingLevel,
      currentYear,
      months,
      minDate,
      maxDate,
      onSelectMonth,
    } = this.props;

    return (
      <View styles={styles.calendar}>
        <MonthsHeader
          showHijri={showHijri}
          styles={styles}
          textStyle={textStyle}
          title={title + currentYear}
          headingLevel={headingLevel}
        />
        <MonthsGridView
          showHijri={showHijri}
          styles={styles}
          textStyle={textStyle}
          currentYear={currentYear}
          months={months}
          minDate={minDate}
          maxDate={maxDate}
          onSelectMonth={onSelectMonth}
        />
      </View>
    );
  }
}
