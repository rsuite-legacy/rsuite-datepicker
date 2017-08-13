import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import classNames from 'classnames';
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
  format: PropTypes.string
};


class MonthHeader extends Component {

  getTimeFormat() {
    const { format } = this.props;
    const timeFormat = [];
    if (!format) {
      return '';
    }

    if (/(H|h)/.test(format)) {
      timeFormat.push('HH');
    }
    if (/m/.test(format)) {
      timeFormat.push('mm');
    }
    if (/s/.test(format)) {
      timeFormat.push('ss');
    }

    return timeFormat.join(':');
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
      className,
      defaultClassName,
      ...props
     } = this.props;

    const dateContainer = [
      <i
        key="btn-backward"
        className={this.prefix('backward')}
        role="button"
        tabIndex="-1"
        onClick={onMoveBackward && _.debounce(onMoveBackward, 200)}
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
        onClick={onMoveForword && _.debounce(onMoveForword, 200)}
      />
    ];

    const classes = classNames(defaultClassName, className);
    const elementProps = _.omit(props, Object.keys(propTypes));

    return (
      <div
        {...elementProps}
        className={classes}
      >
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
