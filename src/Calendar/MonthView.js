import React from 'react';
import PropTypes from 'prop-types';
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
    return dateA.getMonth() === dateB.getMonth();
  }

  let thisMonthDate = new Date(date);
  let prevMonthDate = new Date(thisMonthDate);
  prevMonthDate.setMonth(thisMonthDate.getMonth() - 1);
  let nextMonthDate = new Date(thisMonthDate);
  nextMonthDate.setMonth(thisMonthDate.getMonth() + 1);
  return (
    <div className="monthView">
      <div className="monthView-weeksWrapper">
        <Weeks
          weeks={getMonthView(prevMonthDate)}
          selected={selected}
          dateFilter={date => inSameMonth(date, prevMonthDate) && dateFilter(date)}
        />
        <Weeks
          weeks={getMonthView(thisMonthDate)}
          selected={selected}
          onClick={onClick}
          dateFilter={date => inSameMonth(date, thisMonthDate) && dateFilter(date)}
        />
        <Weeks
          weeks={getMonthView(nextMonthDate)}
          selected={selected}
          dateFilter={date => inSameMonth(date, nextMonthDate) && dateFilter(date)}
        />
      </div>
    </div>
  );
};

MonthView.propTypes = propTypes;

export default MonthView;
