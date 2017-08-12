import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import decorate from '../utils/decorate';

const propTypes = {
  date: PropTypes.instanceOf(moment),
  onMoveForword: PropTypes.func,
  onMoveBackward: PropTypes.func,
  onToggleMonthDropdown: PropTypes.func,
  onToggleTimeDropdown: PropTypes.func,
  showMonth: PropTypes.bool,
  showDate: PropTypes.bool,
  showTime: PropTypes.bool,
  time: PropTypes.shape({
    hours: PropTypes.number,
    minutes: PropTypes.number,
    seconds: PropTypes.number
  })
};


class MonthHeader extends Component {

  getTimeFormat() {
    const { time } = this.props;
    const format = [];
    if (!time) {
      return '';
    }
    if (time.hours >= 0) {
      format.push('HH');
    }
    if (time.minutes >= 0) {
      format.push('mm');
    }
    if (time.seconds >= 0) {
      format.push('ss');
    }
    return format.join(':');
  }

  getDateFormat() {
    const { showDate, showMonth } = this.props;

    if (showDate) {
      return 'YYYY-MM-DD';
    } else if (showMonth) {
      return 'YYYY-MM';
    }

    return 'YYYY';
  }

  render() {
    const {
      date,
      onMoveForword,
      onMoveBackward,
      onToggleMonthDropdown,
      onToggleTimeDropdown,
      showTime,
      showDate,
      showMonth,
      defaultClassName
     } = this.props;

    const dateContainer = [
      <i
        key="btn-backward"
        className={this.prefix('backward')}
        role="button"
        tabIndex="-1"
        onClick={_.debounce(onMoveBackward, 200)}
      />,
      <span
        key="title-date"
        role="button"
        tabIndex="-1"
        className={`${this.prefix('title')} title-date`}
        onClick={onToggleMonthDropdown}
      >
        {date && date.format(this.getDateFormat())}
      </span>,
      <i
        key="btn-forward"
        className={this.prefix('forward')}
        role="button"
        tabIndex="-1"
        onClick={_.debounce(onMoveForword, 200)}
      />
    ];

    return (
      <div className={defaultClassName}>
        {(showDate || showMonth) && dateContainer}
        {
          showTime ? (
            <span
              role="button"
              tabIndex="-1"
              className={`${this.prefix('title')} title-time`}
              onClick={onToggleTimeDropdown}
            >
              {date && date.format(this.getTimeFormat())}
            </span>
          ) : null
        }
      </div>
    );
  }
}

MonthHeader.propTypes = propTypes;

export default decorate({
  prefixClass: 'calendar-header'
})(MonthHeader);
