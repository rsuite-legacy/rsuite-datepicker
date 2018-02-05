// @flow

import * as React from 'react';
import type { Moment } from 'moment';
import classNames from 'classnames';
import _ from 'lodash';
import { getUnhandledProps, prefix } from 'rsuite-utils/lib/utils';
import { constants } from 'rsuite-utils/lib/Picker';


import MonthDropdown from './MonthDropdown';
import TimeDropdown from './TimeDropdown';
import View from './View';
import Header from './Header';
import disabledTime, { calendarOnlyProps } from '../utils/disabledTime';

const { namespace } = constants;

type Props = {
  pageDate: Moment,
  disabledDate?: (date: Moment) => boolean,
  disabledHours?: (hour: number, date: Moment) => boolean,
  disabledMinutes?: (minute: number, date: Moment) => boolean,
  disabledSeconds?: (second: number, date: Moment) => boolean,
  hideHours?: (hour: number, date: Moment) => boolean,
  hideMinutes?: (minute: number, date: Moment) => boolean,
  hideSeconds?: (second: number, date: Moment) => boolean,
  calendarState?: string,
  onMoveForword?: (nextPageDate: Moment) => void,
  onMoveBackward?: (nextPageDate: Moment) => void,
  onSelect?: (date: Moment) => void,
  onToggleMonthDropdown?: (toggle: boolean) => void,
  onToggleTimeDropdown?: (toggle: boolean) => void,
  onChangePageDate?: (nextPageDate: Moment) => void,
  onChangePageTime?: (nextPageTime: Moment) => void,
  calendarRef?: React.ElementRef<*>,
  format: string,
  isoWeek?: boolean,
  yearCeiling?: number,
  className?: string,
  classPrefix?: string
}

class Calendar extends React.Component<Props> {

  static defaultProps = {
    classPrefix: `${namespace}-calendar`,
  };
  disabledDate = (date: Moment) => {
    const { disabledDate } = this.props;
    if (disabledDate && disabledDate(date)) {
      return true;
    }
    return false;
  }

  disabledTime = (date: Moment) => disabledTime(this.props, date)

  shouldMountTime(props?: Props) {
    const { format } = props || this.props;
    return /(H|h|m|s)/.test(format);
  }

  shouldMountMonth(props?: Props) {
    const { format } = props || this.props;
    return /Y/.test(format) && /M/.test(format);
  }

  shouldMountDate(props?: Props): boolean {
    const { format } = props || this.props;
    return /Y/.test(format) && /M/.test(format) && /D/.test(format);
  }

  handleMoveForword = () => {
    const { onMoveForword, pageDate } = this.props;
    onMoveForword && onMoveForword(pageDate.clone().add(1, 'month'));
  }

  handleMoveBackward = () => {
    const { onMoveBackward, pageDate } = this.props;
    onMoveBackward && onMoveBackward(pageDate.clone().add(-1, 'month'));
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
      format,
      calendarRef,
      className,
      isoWeek,
      yearCeiling,
      classPrefix,
      ...rest
    } = this.props;


    const showDate = this.shouldMountDate();
    const showTime = this.shouldMountTime();
    const showMonth = this.shouldMountMonth();

    const onlyShowTime = showTime && !showDate && !showMonth;
    const onlyShowMonth = showMonth && !showDate && !showTime;
    const dropTime = calendarState === 'DROP_TIME' || onlyShowTime;
    const dropMonth = calendarState === 'DROP_MONTH' || onlyShowMonth;
    const addPrefix = prefix(classPrefix);

    const calendarClasses = classNames(classPrefix, {
      [addPrefix('show-time-dropdown')]: dropTime,
      [addPrefix('show-month-dropdown')]: dropMonth
    }, className);

    const unhandled = getUnhandledProps(Calendar, rest);
    const timeDropdownProps = _.pick(rest, calendarOnlyProps);
    return (
      <div
        {...unhandled}
        className={calendarClasses}
        ref={calendarRef}
      >
        <Header
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
        {showDate &&
          <View
            key="MonthView"
            activeDate={pageDate}
            onSelect={onSelect}
            isoWeek={isoWeek}
            disabledDate={this.disabledDate}
          />
        }
        {
          showMonth &&
          <MonthDropdown
            date={pageDate}
            onClick={onChangePageDate}
            show={dropMonth}
            yearCeiling={yearCeiling}
          />

        }
        {
          showTime &&
          <TimeDropdown
            {...timeDropdownProps}
            date={pageDate}
            format={format}
            show={dropTime}
            onClick={onChangePageTime}
          />
        }

      </div>
    );
  }
}


export default Calendar;
