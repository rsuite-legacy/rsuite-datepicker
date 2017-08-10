import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';

const propTypes = {
  date: PropTypes.instanceOf(Date),
  onMoveForword: PropTypes.func,
  onMoveBackward: PropTypes.func,
  onToggleMonthDropdown: PropTypes.func,
  onToggleTimeDropdown: PropTypes.func,
  missDate: PropTypes.bool
};

class MonthHeader extends Component {
  render() {
    const {
      date,
      missDate,
      onMoveForword,
      onMoveBackward,
      onToggleMonthDropdown,
      onToggleTimeDropdown
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

          {
            missDate ?
              `${moment(date).format('YYYY-MM')}-??` :
              moment(date).format('YYYY-MM-DD')
          }

        </span>

        <span
          role="button"
          tabIndex="-1"
          className="calendar-header-title title-time"
          onClick={onToggleTimeDropdown}
        >
          {
            '08:10:10'
          }
        </span>
        <i
          className="calendar-header-forward"
          role="button"
          tabIndex="-1"
          onClick={_.debounce(onMoveForword, 200)}
        />
      </div>
    );
  }
}

MonthHeader.propTypes = propTypes;

export default MonthHeader;
