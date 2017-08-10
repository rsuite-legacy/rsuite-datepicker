import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';


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
          let classes = classNames('week-day', {
            'non-this-month': !dateFilter(thisDate),
            'is-today': thisDate.toDateString() === (new Date()).toDateString(),
            selected: thisDate.toDateString() === selected.toDateString()
          });

          days.push(
            <div
              className={classes}
              onClick={onClick && onClick.bind(null, thisDate)}
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
