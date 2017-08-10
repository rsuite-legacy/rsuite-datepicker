import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Weeks from './Weeks';


const propTypes = {
  date: PropTypes.instanceOf(Date),
  selected: PropTypes.instanceOf(Date),
  onClick: PropTypes.func,
  dateFilter: PropTypes.func
};

const MonthView = ({ date, selected, onClick, dateFilter }) => {

  /**
   * Get all weeks of this month
   * @params monthDate
   * @return date[]
   */
  function getMonthView(monthDate) {

    let firstDayOfMonth = monthDate.getDay();
    let distance = 0 - firstDayOfMonth;
    let firstWeekendDate = new Date(
      monthDate.getFullYear(),
      monthDate.getMonth(),
      monthDate.getDate() + distance
    );


    let weeks = [firstWeekendDate];
    let nextWeekendDate = new Date(firstWeekendDate);
    nextWeekendDate.setDate(nextWeekendDate.getDate() + 7);

    while (weeks.length < 6) {
      weeks.push(nextWeekendDate);
      nextWeekendDate = new Date(nextWeekendDate);
      nextWeekendDate.setDate(nextWeekendDate.getDate() + 7);
    }

    return weeks;
  }

  // is two date in the same month
  function inSameMonth(dateA, dateB) {
    return moment(dateA).month() === moment(dateB).month();
  }


  const thisMonthDate = moment(date).date(1);
  const prevMonthDate = moment(date).date(1).add(-1, 'month');
  const nextMonthDate = moment(date).date(1).add(1, 'month');

  return (
    <div className="monthView">
      <div className="monthView-weeksWrapper">
        <Weeks
          weeks={getMonthView(prevMonthDate.toDate())}
          selected={selected}
          dateFilter={date => inSameMonth(date, prevMonthDate) && dateFilter(date)}
        />
        <Weeks
          weeks={getMonthView(thisMonthDate.toDate())}
          selected={selected}
          onClick={onClick}
          dateFilter={date => inSameMonth(date, thisMonthDate) && dateFilter(date)}
        />
        <Weeks
          weeks={getMonthView(nextMonthDate.toDate())}
          selected={selected}
          dateFilter={date => inSameMonth(date, nextMonthDate) && dateFilter(date)}
        />
      </div>
    </div>
  );
};

MonthView.propTypes = propTypes;

export default MonthView;
