import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import omit from 'lodash/omit';
import Weeks from './Weeks';


const propTypes = {
  activeDate: PropTypes.instanceOf(moment),
  onSelect: PropTypes.func,
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

  getPrevMonthDate = date => date.clone().date(1).add(-1, 'month');

  getThisMonthDate = date => date.clone().date(1);

  getNextMonthDate = date => date.clone().date(1).add(1, 'month');

  inSameMonthDate = month => date => inSameMonth(month, date)

  inSamePrevMonthDate = (date) => {
    const prevMonthDate = this.getPrevMonthDate(this.props.activeDate);
    return this.inSameMonthDate(date, prevMonthDate);
  }

  inSameThisMonthDate = (date) => {
    const thisMonthDate = this.getThisMonthDate(this.props.activeDate);
    return this.inSameMonthDate(date, thisMonthDate);
  }

  inSameNextMonthDate = (date) => {
    const nextMonthDate = this.getNextMonthDate(this.props.activeDate);
    return this.inSameMonthDate(date, nextMonthDate);
  }

  render() {

    const {
      activeDate,
      onSelect,
      disabledDate,
      className,
      ...props
    } = this.props;

    const thisMonthDate = this.getThisMonthDate(activeDate);
    const prevMonthDate = this.getPrevMonthDate(activeDate);
    const nextMonthDate = this.getNextMonthDate(activeDate);
    const classes = classNames('month-view', className);
    const elementProps = omit(props, Object.keys(propTypes));


    return (
      <div
        {...elementProps}
        className={classes}
      >
        <div className="month-view-weeks-wrapper">
          <Weeks
            inSameMonth={this.inSamePrevMonthDate}
            disabledDate={disabledDate}
            onSelect={onSelect}
            weeks={getMonthView(prevMonthDate)}
          />
          <Weeks
            weeks={getMonthView(thisMonthDate)}
            selected={activeDate}
            onSelect={onSelect}
            inSameMonth={this.inSameThisMonthDate}
            disabledDate={disabledDate}
          />
          <Weeks
            inSameMonth={this.inSameNextMonthDate}
            disabledDate={disabledDate}
            onSelect={onSelect}
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
