import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class MonthDropdownItem extends React.Component {

  handleClick = (event) => {
    const { onClick, dateMonth, curYear, date } = this.props;
    onClick && onClick(moment(date).year(curYear).month(dateMonth), event);
  }

  render() {
    const { className, dateMonth } = this.props;
    return (
      <div
        className={className}
        onClick={this.handleClick}
        key={dateMonth}
        role="button"
        tabIndex="-1"
      >
        {dateMonth + 1}
      </div>
    );
  }
}

MonthDropdownItem.propTypes = {
  date: PropTypes.instanceOf(moment),
  onClick: PropTypes.func,
  dateMonth: PropTypes.number,
  curYear: PropTypes.number
};

export default MonthDropdownItem;
