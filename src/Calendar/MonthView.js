import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import Weeks from './Weeks';


const propTypes = {
  activeDate: PropTypes.instanceOf(moment),
  onClick: PropTypes.func,
  disabledDate: PropTypes.func
};

const defaultProps = {
  activeDate: moment()
};

/**
  * Get all weeks of this month
  * @params monthDate
  * @return date[]
  */
function getMonthView(monthDate) {

  let firstDayOfMonth = monthDate.day();
  let distance = 0 - firstDayOfMonth;
  let firstWeekendDate = monthDate.clone().add(distance, 'days');

  let weeks = [firstWeekendDate];
  let nextWeekendDate = firstWeekendDate.clone().add(7, 'days');

  weeks.push(nextWeekendDate);
  while (weeks.length < 6) {
    nextWeekendDate = nextWeekendDate.clone().add(7, 'days');
    weeks.push(nextWeekendDate);
  }

  return weeks;
}

// is two date in the same month
function inSameMonth(dateA, dateB) {
  return dateA.month() === dateB.month();
}


class MonthView extends React.Component {
  render() {

    const {
      activeDate,
      onClick,
      disabledDate,
      className,
      ...props
    } = this.props;

    const thisMonthDate = activeDate.clone().date(1);
    const prevMonthDate = activeDate.clone().date(1).add(-1, 'month');
    const nextMonthDate = activeDate.clone().date(1).add(1, 'month');

    const classes = classNames('month-view', className);

    return (
      <div
        {...props}
        className={classes}
      >
        <div className="month-view-weeks-wrapper">
          <Weeks
            inSameMonth={date => inSameMonth(date, prevMonthDate)}
            disabledDate={disabledDate}
            weeks={getMonthView(prevMonthDate)}
          />
          <Weeks
            weeks={getMonthView(thisMonthDate)}
            selected={activeDate}
            onClick={onClick}
            inSameMonth={date => inSameMonth(date, thisMonthDate)}
            disabledDate={disabledDate}
          />
          <Weeks
            inSameMonth={date => inSameMonth(date, nextMonthDate)}
            disabledDate={disabledDate}
            weeks={getMonthView(nextMonthDate)}
          />
        </div>
      </div>
    );
  }
}

MonthView.propTypes = propTypes;
MonthView.defaultProps = defaultProps;

export default MonthView;
