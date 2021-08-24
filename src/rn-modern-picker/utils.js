import {useRef, useState} from 'react';
import {Animated, Easing, I18nManager} from 'react-native';
import moment from 'moment-hijri';

const m = moment();
const jalaaliConfigs = {
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  selectedFormat: 'iYYYY/iMM/iDD',
  dateFormat: 'iYYYY/iMM/iDD',
  monthYearFormat: 'iYYYY iMM',
  timeFormat: 'HH:mm ',
  hour: 'Hour',
  minute: 'Minute',
  timeSelect: 'Select',
  timeClose: 'Close',
};
const gregorianConfigs = {
  dayNames: [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ],
  dayNamesShort: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  selectedFormat: 'YYYY/MM/DD',
  dateFormat: 'YYYY/MM/DD',
  monthYearFormat: 'YYYY MM',
  timeFormat: 'HH:mm',
  hour: 'Hour',
  minute: 'Minute',
  timeSelect: 'Select',
  timeClose: 'Close',
};

class utils {
  constructor({minimumDate, maximumDate, isGregorian, mode, reverse, configs}) {
    this.data = {
      minimumDate,
      maximumDate,
      isGregorian,
      reverse: reverse === 'unset' ? !isGregorian : reverse,
    };
    this.config = isGregorian ? gregorianConfigs : jalaaliConfigs;
    this.config = {...this.config, ...configs};

    if (mode === 'time' || mode === 'datepicker') {
      this.config.selectedFormat =
        this.config.dateFormat + ' ' + this.config.timeFormat;
    }
    console.log(
      '🚀 ~ file: utils.js ~ line 85 ~ utils ~ constructor ~  this.config',
      this.config,
    );
  }

  get flexDirection() {
    return {
      flexDirection: this.data.reverse
        ? I18nManager.isRTL
          ? 'row'
          : 'row-reverse'
        : 'row',
    };
  }

  getFormated = (date, formatName = 'selectedFormat') =>
    date.format(this.config[formatName]);

  getFormatedDate = (date = new Date(), format = 'YYYY/MM/DD') => {
    const d = moment(date).format(format);
    return d;
  };

  getTime = time => {
    const t = this.getDate(time).format(this.config.timeFormat);
    console.log('🚀 ~ file: utils.js ~ line 109 ~ utils ~ t', t);
    return t;
  };

  getToday = () => {
    const t = this.getFormated(m, 'dateFormat');
    console.log('🚀 ~ file: utils.js ~ line 117 ~ utils ~ t', t);
    return t;
  };

  getMonthName = month => this.config.monthNames[month];

  toPersianNumber = value => {
    const {isGregorian} = this.data;
    return isGregorian
      ? this.toEnglish(String(value))
      : String(value).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
  };

  toEnglish = value => {
    return value.replace(/[\u0660-\u0669]/g, d => d.charCodeAt() - 1632);
  };

  getDate = time => moment(time, this.config.selectedFormat);

  getMonthYearText = time => {
    const {isGregorian} = this.data;
    const date = this.getDate(time);
    const year = this.toPersianNumber(isGregorian ? date.year() : date.iYear());
    const month = this.getMonthName(isGregorian ? date.month() : date.iMonth());
    return `${month} ${year}`;
  };

  checkMonthDisabled = time => {
    const {minimumDate, maximumDate, isGregorian} = this.data;
    const date = this.getDate(time);
    let disabled = false;
    if (minimumDate) {
      const lastDayInMonth = isGregorian ? date.date(29) : date.iDate(29);
      disabled = lastDayInMonth < this.getDate(minimumDate);
    }
    if (maximumDate && !disabled) {
      const firstDayInMonth = isGregorian ? date.date(1) : date.iDate(1);
      disabled = firstDayInMonth > this.getDate(maximumDate);
    }
    return disabled;
  };

  checkArrowMonthDisabled = (time, next) => {
    const {isGregorian} = this.data;
    const date = this.getDate(time);
    return this.checkMonthDisabled(
      this.getFormated(
        date.add(next ? -1 : 1, isGregorian ? 'month' : '.iMonth'),
      ),
    );
  };

  checkYearDisabled = (year, next) => {
    const {minimumDate, maximumDate, isGregorian} = this.data;
    const y = isGregorian
      ? this.getDate(next ? maximumDate : minimumDate).year()
      : this.getDate(next ? maximumDate : minimumDate).iYear();
    return next ? year >= y : year <= y;
  };

  checkSelectMonthDisabled = (time, month) => {
    const {isGregorian} = this.data;
    const date = this.getDate(time);
    const dateWithNewMonth = isGregorian
      ? date.month(month)
      : date.iMonth(month);
    return this.checkMonthDisabled(this.getFormated(dateWithNewMonth));
  };

  validYear = (time, year) => {
    const {minimumDate, maximumDate, isGregorian} = this.data;
    const date = isGregorian
      ? this.getDate(time).year(year)
      : this.getDate(time).iYear(year);
    let validDate = this.getFormated(date);
    if (minimumDate && date < this.getDate(minimumDate)) {
      validDate = minimumDate;
    }
    if (maximumDate && date > this.getDate(maximumDate)) {
      validDate = maximumDate;
    }
    return validDate;
  };

  getMonthDays = time => {
    const {minimumDate, maximumDate, isGregorian} = this.data;
    console.log(
      '🚀 ~ file: utils.js ~ line 207 ~ utils ~ time',
      time,
      this.data,
    );

    let date = this.getDate(time);
    console.log('🚀 ~ file: utils.js ~ line 210 ~ utils ~ date', date);
    const currentMonthDays = isGregorian
      ? date.daysInMonth()
      : m.iDaysInMonth(date.iYear, date.iMonth);
    console.log(
      '🚀 ~ file: utils.js ~ line 210 ~ utils ~ currentMonthDays',
      currentMonthDays,
    );
    const firstDay = isGregorian ? date.date(1) : date.iDate(1);
    const dayOfMonth = isGregorian
      ? (firstDay.day() + 1) % 7
      : (firstDay.day() + 0) % 7;

    return [
      ...new Array(dayOfMonth),
      ...[...new Array(currentMonthDays)].map((i, n) => {
        const thisDay = isGregorian ? date.date(n + 1) : date.iDate(n + 1);
        let disabled = false;
        if (minimumDate) {
          disabled = thisDay < this.getDate(minimumDate);
        }
        if (maximumDate && !disabled) {
          disabled = thisDay > this.getDate(maximumDate);
        }

        date = this.getDate(time);
        return {
          dayString: this.toPersianNumber(n + 1),
          day: n + 1,
          date: this.getFormated(
            isGregorian ? date.date(n + 1) : date.iDate(n + 1),
          ),
          disabled,
        };
      }),
    ];
  };

  useMonthAnimation = (activeDate, distance, onEnd = () => null) => {
    const [lastDate, setLastDate] = useState(activeDate);
    const [changeWay, setChangeWay] = useState(null);
    const monthYearAnimation = useRef(new Animated.Value(0)).current;

    const changeMonthAnimation = type => {
      setChangeWay(type);
      setLastDate(activeDate);
      monthYearAnimation.setValue(1);
      Animated.timing(monthYearAnimation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        easing: Easing.bezier(0.33, 0.66, 0.54, 1),
      }).start(onEnd);
    };

    const shownAnimation = {
      opacity: monthYearAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1],
      }),
      transform: [
        {
          translateX: monthYearAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, changeWay === 'NEXT' ? -distance : distance],
          }),
        },
      ],
    };

    const hiddenAnimation = {
      opacity: monthYearAnimation,
      transform: [
        {
          translateX: monthYearAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [changeWay === 'NEXT' ? distance : -distance, 0],
          }),
        },
      ],
    };

    return [{lastDate, shownAnimation, hiddenAnimation}, changeMonthAnimation];
  };
}

export {utils};
