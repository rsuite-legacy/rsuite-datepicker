import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  weekendDate: PropTypes.instanceOf(Date),
  selected: PropTypes.instanceOf(Date),
  onClick: PropTypes.func,
  dateFilter: PropTypes.func
};

const Week = ({ weekendDate, selected = new Date(), onClick, dateFilter }) => (
  <div className="week">
    {
      (() => {
        let days = [];
        for (let i = 0; i < 7; i += 1) {
          let thisDate = new Date(weekendDate);
          thisDate.setDate(weekendDate.getDate() + i);
          let className = 'week-day';
          className += dateFilter(thisDate) ? '' : ' disable';
          className += thisDate.toDateString() === (new Date()).toDateString()
            ? ' is-today' : '';
          className += thisDate.toDateString() === selected.toDateString()
            ? ' selected' : '';
          days.push(
            <div
              className={className}
              onClick={onClick && dateFilter(thisDate) && onClick.bind(null, thisDate)}
              key={i}
            >
              {thisDate.getDate()}
            </div>
          );
        }
        return days;
      })()
    }
  </div>
);

Week.propTypes = propTypes;

export default Week;
