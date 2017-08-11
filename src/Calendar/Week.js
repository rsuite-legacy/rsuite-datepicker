import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';

const propTypes = {
  weekendDate: PropTypes.instanceOf(moment),
  selected: PropTypes.instanceOf(moment),
  onClick: PropTypes.func,
  disabledDate: PropTypes.func,
  inSameMonth: PropTypes.func
};

const Week = ({
  weekendDate,
  selected = moment(),
  onClick,
  disabledDate,
  inSameMonth
 }) => (
    <div className="week">
      {
        (() => {
          let days = [];
          for (let i = 0; i < 7; i += 1) {

            let thisDate = moment(weekendDate).add(i, 'd');
            let disabled = disabledDate && disabledDate(thisDate);
            let classes = classNames('week-day', {
              'un-same-month': !(inSameMonth && inSameMonth(thisDate)),
              'is-today': thisDate.isSame(moment(), 'date'),
              selected: thisDate.isSame(selected, 'date'),
              disabled
            });

            days.push(
              <div
                className={classes}
                role="menu"
                tabIndex="-1"
                onClick={!disabled && onClick && onClick.bind(null, thisDate)}
                key={i}
              >
                <span className="date-item">{thisDate.date()}</span>
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
