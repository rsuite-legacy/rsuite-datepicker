import React from 'react';
import PropTypes from 'prop-types';
import {
  EditPanel,
  MonthView,
  MonthHeader,
  WeekHeader
} from './components/calendar';


const Calendar = React.createClass({
  propTypes: {
    calendarState: PropTypes.string,
    selectedDate: PropTypes.instanceOf(Date),
    pageDate: PropTypes.instanceOf(Date),
    minDate: PropTypes.instanceOf(Date),
    maxDate: PropTypes.instanceOf(Date),
    onMoveForword: PropTypes.func,
    onMoveBackward: PropTypes.func,
    onSelect: PropTypes.func,
    onClickTitle: PropTypes.func,
    onChangePageDate: PropTypes.func,
    dateFilter: PropTypes.func
  },

  shouldComponentUpdate(nextProps, nextState) {
    const props = this.props;
    return (
      nextProps.calendarState !== props.calendarState ||
      this.isDayChanged(nextProps.selectedDate, props.selectedDate) ||
      this.isDayChanged(nextProps.pageDate, props.pageDate) ||
      this.isDayChanged(nextProps.minDate, props.minDate) ||
      this.isDayChanged(nextProps.maxDate, props.maxDate)
    );
  },

  isDayChanged(dateA, dateB) {
    if (dateA && dateB) {
      return dateA.toDateString() !== dateB.toDateString();
    } else if (!dateA && !dateB) {
      return false;
    } else {
      return true;
    }
  },

  onMoveForword() {
    const { onMoveForword, pageDate } = this.props;
    let nextPageDate = new Date(pageDate.getFullYear(), pageDate.getMonth() + 1);
    onMoveForword && onMoveForword(nextPageDate);
  },

  onMoveBackward() {
    const { onMoveBackward, pageDate } = this.props;
    let nextPageDate = new Date(pageDate.getFullYear(), pageDate.getMonth() - 1);
    onMoveBackward && onMoveBackward(nextPageDate);
  },

  render() {
    const {
      calendarState,
      selectedDate,
      pageDate,
      onSelect,
      onClickTitle,
      onChangePageDate
    } = this.props;

    const stateClassname = {
      SLIDING_L: ' sliding-left',
      SLIDING_R: ' sliding-right',
      EDITING: ' is-editing'
    }[calendarState] || '';

    let isEditingPageDate = calendarState === 'EDITING';

    return (
      <div className={`calendar${stateClassname}`}>
        <MonthHeader
          date={pageDate}
          onMoveForword={this.onMoveForword}
          onMoveBackward={this.onMoveBackward}
          onClickTitle={onClickTitle}
        />
        {isEditingPageDate && <EditPanel
          date={pageDate}
          onClick={onChangePageDate}
        />
        }
        <WeekHeader />
        <MonthView
          date={pageDate}
          selected={selectedDate}
          onClick={onSelect}
          dateFilter={this.dateFilter}
        />
      </div>
    );
  },

  dateFilter(date) {
    const { minDate, maxDate, dateFilter } = this.props;
    if (minDate && date.getTime() < minDate.getTime()) {
      return false;
    }
    if (maxDate && date.getTime() > maxDate.getTime()) {
      return false;
    }
    if (dateFilter && !dateFilter(date)) {
      return false;
    }
    return true;
  }
});

export default Calendar;
