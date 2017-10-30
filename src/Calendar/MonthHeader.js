import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import moment from 'moment';
import classNames from 'classnames';
import omit from 'lodash/omit';
import isEqual from 'lodash/isEqual';
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
  format: PropTypes.string,
  disabledDate: PropTypes.func,
  disabledTime: PropTypes.func
};

const defaultProps = {
  date: moment()
};


class MonthHeader extends Component {

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
  }

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
      disabledDate,
      disabledTime,
      ...props
    } = this.props;

    const dateTitleClasses = classNames(this.prefix('title'), 'title-date', {
      error: disabledDate && disabledDate(date)
    });

    const timeTitleClasses = classNames(this.prefix('title'), 'title-time', {
      error: disabledTime && disabledTime(date)
    });

    const dateContainer = [
      <i
        key="btn-backward"
        className={this.prefix('backward')}
        role="button"
        tabIndex="-1"
        onClick={onMoveBackward && debounce(onMoveBackward, 200)}
      />,
      <span
        key="title-date"
        role="button"
        tabIndex="-1"
        className={dateTitleClasses}
        onClick={onToggleMonthDropdown}
      >
        {date && date.format(this.getDateFormat())}
      </span>,
      <i
        key="btn-forward"
        className={this.prefix('forward')}
        role="button"
        tabIndex="-1"
        onClick={onMoveForword && debounce(onMoveForword, 200)}
      />
    ];

    const classes = classNames(defaultClassName, className);
    const elementProps = omit(props, Object.keys(propTypes));

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
              className={timeTitleClasses}
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
MonthHeader.defaultProps = defaultProps;

export default decorate({
  prefixClass: 'calendar-header'
})(MonthHeader);
