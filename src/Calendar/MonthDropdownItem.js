import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const propTypes = {
  date: PropTypes.instanceOf(moment),
  onClick: PropTypes.func,
  month: PropTypes.number,
  year: PropTypes.number
};

const defaultProps = {
  month: 0
};

class MonthDropdownItem extends React.Component {

  handleClick = (event) => {
    const { onClick, month, year, date } = this.props;
    onClick && onClick(moment(date).year(year).month(month - 1), event);
  }

  render() {
    const { className, month, ...props } = this.props;
    return (
      <div
        {...props}
        className={className}
        onClick={this.handleClick}
        key={month}
        role="button"
        tabIndex="-1"
      >
        {month}
      </div>
    );
  }
}

MonthDropdownItem.propTypes = propTypes;
MonthDropdownItem.defaultProps = defaultProps;

export default MonthDropdownItem;
