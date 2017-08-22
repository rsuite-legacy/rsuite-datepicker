import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import MonthDropdown from './MonthDropdown';
import TimeDropdown from './TimeDropdown';
import MonthView from './MonthView';
import MonthHeader from './MonthHeader';
import WeekHeader from './WeekHeader';
import calendarPropTypes from '../calendarPropTypes';
import decorate from '../utils/decorate';

const propTypes = {
  ...calendarPropTypes,
  calendarState: PropTypes.string,
  pageDate: PropTypes.instanceOf(moment),
  onMoveForword: PropTypes.func,
  onMoveBackward: PropTypes.func,
  onSelect: PropTypes.func,
  onToggleMonthDropdown: PropTypes.func,
  onToggleTimeDropdown: PropTypes.func,
  onChangePageDate: PropTypes.func,
  onChangePageTime: PropTypes.func,
  calendarRef: PropTypes.func,
  format: PropTypes.string
};


class Calendar extends React.Component {

  disabledDate = (date) => {
    const { disabledDate } = this.props;
    if (disabledDate && disabledDate(date)) {
      return true;
    }
    return false;
  }
  disabledTime = (date) => {

    if (!date) {
      return false;
    }

    const calendarProps = pick(this.props, Object.keys(calendarPropTypes));
    return Object.keys(calendarProps).some((key) => {
      if (/(Hours)/.test(key)) {
        return calendarProps[key](date.hours(), date);
      }
      if (/(Minutes)/.test(key)) {
        return calendarProps[key](date.minutes(), date);
      }
      if (/(Seconds)/.test(key)) {
        return calendarProps[key](date.seconds(), date);
      }
      return false;
    });
  };

  shouldMountTime(props) {
    const { format } = props || this.props;
    return /(H|h|m|s)/.test(format);
  }

  shouldMountMonth(props) {
    const { format } = props || this.props;
    return /Y/.test(format) && /M/.test(format);
  }

  shouldMountDate(props) {
    const { format } = props || this.props;
    return /Y/.test(format) && /M/.test(format) && /D/.test(format);
  }

  handleMoveForword = () => {
    const { onMoveForword, pageDate } = this.props;
    onMoveForword && onMoveForword(pageDate);
  }

  handleMoveBackward = () => {
    const { onMoveBackward, pageDate } = this.props;
    onMoveBackward && onMoveBackward(pageDate);
  }

  render() {

    const {
      calendarState,
      pageDate,
      onSelect,
      onToggleMonthDropdown,
      onToggleTimeDropdown,
      onChangePageDate,
      onChangePageTime,
      inline,
      format,
      calendarRef,
      className,
      ...props
    } = this.props;


    const showDate = this.shouldMountDate();
    const showTime = this.shouldMountTime();
    const showMonth = this.shouldMountMonth();

    const onlyShowTime = showTime && !showDate && !showMonth;
    const onlyShowMonth = showMonth && !showDate && !showTime;
    const dropTime = calendarState === 'DROP_TIME' || onlyShowTime;
    const dropMonth = calendarState === 'DROP_MONTH' || onlyShowMonth;

    const calendarClasses = classNames(this.prefix('calendar'), {
      'drop-time': dropTime,
      'drop-month': dropMonth,
      'sliding-left': calendarState === 'SLIDING_L',
      'sliding-right': calendarState === 'SLIDING_R'
    }, className);

    const elementProps = omit(props, Object.keys(propTypes));
    const calendar = [
      <WeekHeader key={'WeekHeader'} />,
      <MonthView
        key={'MonthView'}
        activeDate={pageDate}
        onClick={onSelect}
        disabledDate={this.disabledDate}
      />
    ];

    const timeDropdownProps = pick(props, Object.keys(calendarPropTypes));

    return (
      <div
        {...elementProps}
        className={calendarClasses}
        ref={calendarRef}
      >
        <MonthHeader
          date={pageDate}
          format={format}
          showMonth={showMonth}
          showDate={showDate}
          showTime={showTime}
          disabledDate={this.disabledDate}
          disabledTime={this.disabledTime}
          onMoveForword={this.handleMoveForword}
          onMoveBackward={this.handleMoveBackward}
          onToggleMonthDropdown={onToggleMonthDropdown}
          onToggleTimeDropdown={onToggleTimeDropdown}
        />
        {showDate && calendar}
        {
          showMonth ? (
            <MonthDropdown
              date={pageDate}
              show={dropMonth}
              onClick={onChangePageDate}
            />
          ) : null
        }
        {
          showTime ? (
            <TimeDropdown
              {...timeDropdownProps}
              date={pageDate}
              format={format}
              show={dropTime}
              onClick={onChangePageTime}
            />
          ) : null
        }

      </div>
    );
  }
}

Calendar.propTypes = propTypes;

export default decorate()(Calendar);
