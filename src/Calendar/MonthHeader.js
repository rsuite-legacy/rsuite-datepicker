import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';

const propTypes = {
  date: PropTypes.instanceOf(moment),
  onMoveForword: PropTypes.func,
  onMoveBackward: PropTypes.func,
  onToggleMonthDropdown: PropTypes.func,
  onToggleTimeDropdown: PropTypes.func,
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

  render() {
    const {
      date,
      onMoveForword,
      onMoveBackward,
      onToggleMonthDropdown,
      onToggleTimeDropdown,
      time
     } = this.props;


    return (
      <div className="calendar-header">
        <i
          className="calendar-header-backward"
          role="button"
          tabIndex="-1"
          onClick={_.debounce(onMoveBackward, 200)}
        />
        <span
          role="button"
          tabIndex="-1"
          className="calendar-header-title title-date"
          onClick={onToggleMonthDropdown}
        >
          {date.format('YYYY-MM-DD')}
        </span>
        <i
          className="calendar-header-forward"
          role="button"
          tabIndex="-1"
          onClick={_.debounce(onMoveForword, 200)}
        />
        {
          time ? (
            <span
              role="button"
              tabIndex="-1"
              className="calendar-header-title title-time"
              onClick={onToggleTimeDropdown}
            >
              {date.format(this.getTimeFormat())}
            </span>
          ) : null
        }
      </div>
    );
  }
}

MonthHeader.propTypes = propTypes;

export default MonthHeader;
