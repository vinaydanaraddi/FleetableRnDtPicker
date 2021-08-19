import React from 'react';
import {View, Text, Platform} from 'react-native';
import PropTypes from 'prop-types';
import {stylePropType} from './localPropTypes';
import {default as momentHijri} from 'moment-hijri';

export default function MonthsHeader(props) {
  const {styles, textStyle, headingLevel, title, showHijri} = props;

  const accessibilityProps = {accessibilityRole: 'header'};
  if (Platform.OS === 'web') {
    accessibilityProps['aria-level'] = headingLevel;
  }

  return (
    <View style={styles.headerWrapper}>
      <Text style={[styles.monthsHeaderText, textStyle]}>{title}</Text>
    </View>
  );
}

MonthsHeader.propTypes = {
  styles: stylePropType,
  textStyle: stylePropType,
  title: PropTypes.string,
};
