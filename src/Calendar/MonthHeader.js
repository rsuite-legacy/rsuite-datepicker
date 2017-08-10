import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const propTypes = {
  date: PropTypes.instanceOf(Date),
  onMoveForword: PropTypes.func,
  onMoveBackward: PropTypes.func,
  onToggleMonthDropdown: PropTypes.func,
  onToggleTimeDropdown: PropTypes.func
};

class MonthHeader extends Component {
  render() {
    const {
      date,
      onMoveForword,
      onMoveBackward,
      onToggleMonthDropdown,
      onToggleTimeDropdown
     } = this.props;
    return (
      <div className="monthHeader">
        <i
          className="monthHeader-backward"
          role="button"
          tabIndex="-1"
          onClick={_.debounce(onMoveBackward, 200)}
        />
        <span
          role="button"
          tabIndex="-1"
          className="monthHeader-title"
          onClick={onToggleMonthDropdown}
        >
          {
            `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
          }
        </span>

        <span
          role="button"
          tabIndex="-1"
          className="monthHeader-title"
          onClick={onToggleTimeDropdown}
        >
          {
            '08:10:10'
          }
        </span>
        <i
          className="monthHeader-forward"
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
