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
    'Muharram',
    'Safar',
    'Rabi I',
    'Rabi II',
    'Jumada I',
    'Jumada II',
    'Rajab',
    'Shaaban',
    'Ramadan',
    'Shawwal',
    'Dhu al-Qidah',
    'Dhu al-Hijjah',
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
      reverse: false,
    };
    this.config = isGregorian ? gregorianConfigs : jalaaliConfigs;
    this.config = {...this.config, ...configs};
    if (mode === 'time' || mode === 'datepicker') {
      this.config.selectedFormat =
        this.config.dateFormat + ' ' + this.config.timeFormat;
    }
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

  getFormatedDate = (date = new Date(), format = 'YYYY/MM/DD') =>
    moment(date).format(format);

  getTime = time => this.getDate(time).format(this.config.timeFormat);

  getToday = () => this.getFormated(m, 'dateFormat');

  getMonthName = month => this.config.monthNames[month];

  getDate = time => moment(time, this.config.selectedFormat);

  getMonthYearText = time => {
    const {isGregorian} = this.data;
    const date = this.getDate(time);
    const year = isGregorian ? date.year() : date.iYear();
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
        date.add(next ? -1 : 1, isGregorian ? 'month' : 'iMonth'),
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
    let date = this.getDate(time);
    const currentMonthDays = isGregorian
      ? date.daysInMonth()
      : moment.iDaysInMonth(date.iYear(), date.iMonth());
    console.log(
      '🚀 ~ file: utils.js ~ line 184 ~ utils ~ currentMonthDays',
      currentMonthDays,
    );
    const firstDay = isGregorian ? date.date(1) : date.iDate(1);
    const dayOfMonth = (firstDay.day() + 0) % 7;

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
          dayString: n + 1,
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
