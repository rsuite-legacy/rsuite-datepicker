import React from 'react';
import PropTypes from 'prop-types';

class MonthDropdownItem extends React.Component {

  handleClick = (event) => {
    const { onClick, dateMonth, curYear } = this.props;
    onClick && onClick(new Date(curYear, dateMonth), event);
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
  onClick: PropTypes.func,
  dateMonth: PropTypes.number,
  curYear: PropTypes.number
};

export default MonthDropdownItem;
