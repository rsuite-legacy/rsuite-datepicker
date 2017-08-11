import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import _ from 'lodash';
import MonthDropdown from './MonthDropdown';
import TimeDropdown from './TimeDropdown';
import MonthView from './MonthView';
import MonthHeader from './MonthHeader';
import WeekHeader from './WeekHeader';
import calendarPropTypes from '../calendarPropTypes';

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
  time: PropTypes.shape({
    hours: PropTypes.number,
    minutes: PropTypes.number,
    seconds: PropTypes.number
  })
};


class Calendar extends React.Component {

  handleMoveForword = () => {
    const { onMoveForword, pageDate } = this.props;
    onMoveForword && onMoveForword(pageDate);
  }

  handleMoveBackward = () => {
    const { onMoveBackward, pageDate } = this.props;
    onMoveBackward && onMoveBackward(pageDate);
  }

  disabledDate = (date) => {
    const { disabledDate } = this.props;
    if (disabledDate && disabledDate(date)) {
      return true;
    }
    return false;
  }

  render() {

    const {
      calendarState,
      pageDate,
      time,
      onSelect,
      onToggleMonthDropdown,
      onToggleTimeDropdown,
      onChangePageDate,
      onChangePageTime,
      ...props
    } = this.props;


    const calendarClasses = classNames('calendar', {
      SLIDING_L: 'sliding-left',
      SLIDING_R: 'sliding-right',
      DROP_MONTH: 'drop-month',
      DROP_TIME: 'drop-time'
    }[calendarState] || '');

    return (
      <div className={calendarClasses}>
        <MonthHeader
          date={pageDate}
          time={time}
          onMoveForword={this.handleMoveForword}
          onMoveBackward={this.handleMoveBackward}
          onToggleMonthDropdown={onToggleMonthDropdown}
          onToggleTimeDropdown={onToggleTimeDropdown}
        />
        <MonthDropdown
          date={pageDate}
          show={calendarState === 'DROP_MONTH'}
          onClick={onChangePageDate}
        />
        <TimeDropdown
          {..._.pick(props, Object.keys(calendarPropTypes))}
          date={pageDate}
          time={time}
          show={calendarState === 'DROP_TIME'}
          onClick={onChangePageTime}
        />
        <WeekHeader />
        <MonthView
          activeDate={pageDate}
          onClick={onSelect}
          disabledDate={this.disabledDate}
        />
      </div>
    );
  }
}

Calendar.propTypes = propTypes;

export default Calendar;
