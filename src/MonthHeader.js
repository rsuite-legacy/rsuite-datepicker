import React, { PropTypes } from 'react';
import debounce from './utils/debounce';

const MonthHeader = React.createClass({
  propTypes: {
    date: PropTypes.instanceOf(Date),
    onMoveForword: PropTypes.func,
    onMoveBackward: PropTypes.func,
    onClickTitle: PropTypes.func
  },
  render() {
    const { date, onMoveForword, onMoveBackward, onClickTitle } = this.props;
    return (
      <div className="monthHeader">
        <i className="monthHeader-backward"
          onClick={debounce(onMoveBackward, 200)}
        >
          {String.fromCharCode(9664)}
        </i>
        <span className="monthHeader-title" onClick={onClickTitle}>
          {date.getFullYear() + ' - ' + (date.getMonth() + 1)}
        </span>
        <i className="monthHeader-forward"
          onClick={debounce(onMoveForword, 200)}
        >
          {String.fromCharCode(9654)}
        </i>
      </div>
    );
  }
});

export default MonthHeader;
