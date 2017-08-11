import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import { findDOMNode } from 'react-dom';
import RootCloseWrapper from 'rsuite/lib/fixtures/RootCloseWrapper';
import DateContainer from './DateContainer';
import Calendar from './Calendar';
import { transitionEndDetect } from './utils/eventDetect';

const propTypes = {
  defaultValue: PropTypes.instanceOf(Date),
  value: PropTypes.instanceOf(Date),
  autoClose: PropTypes.bool,
  placeholder: PropTypes.string,
  format: PropTypes.string,
  onChange: PropTypes.func,
  dateFilter: PropTypes.func,
  locale: PropTypes.object,
  inline: PropTypes.bool
};
const contextTypes = {
  formGroup: PropTypes.object
};

const childContextTypes = {
  locale: PropTypes.object
};

const defaultProps = {
  format: 'YYYY-MM-DD',
  autoClose: true,
  placeholder: '',
  locale: {
    week: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  }
};

class DatePicker extends Component {
  constructor(props) {
    super(props);

    const { defaultValue, value } = props;
    const activeValue = value || defaultValue || this.getDefaultPageDate();
    const ret = transitionEndDetect();

    this.state = {
      value: activeValue,
      missDate: false,
      pageDate: activeValue,
      calendarState: 'HIDE',
      transitionSupport: ret
    };
  }

  getChildContext() {
    return {
      locale: this.props.locale
    };
  }

  componentDidMount() {
    const { transitionSupport } = this.state;
    let el = findDOMNode(this.calendar);
    if (transitionSupport.supported && el) {
      el.addEventListener(transitionSupport.event, (e) => {
        if (e.target.className === 'monthView-weeksWrapper'
          && e.propertyName === 'left') {
          this.onMoveDone();
        }
      });
    }
  }
  onMoveForword = (nextPageDate) => {
    const { transitionSupport } = this.state;
    if (!transitionSupport.supported) {
      this.setState({
        pageDate: nextPageDate
      });
      return;
    }
    this.setState({
      calendarState: 'SLIDING_L'
    });
  }

  onMoveBackward = (nextPageDate) => {
    const { transitionSupport } = this.state;
    if (!transitionSupport.supported) {
      this.setState({
        pageDate: nextPageDate
      });
      return;
    }
    this.setState({
      calendarState: 'SLIDING_R'
    });
  }

  onMoveDone() {
    const { calendarState, pageDate } = this.state;
    let pageChanges = 0;
    if (calendarState === 'SLIDING_L') {
      pageChanges = 1;
    }
    if (calendarState === 'SLIDING_R') {
      pageChanges = -1;
    }
    let nextPageDate = new Date(pageDate.getFullYear(), pageDate.getMonth() + pageChanges);
    this.setState({
      pageDate: nextPageDate,
      missDate: true,
      calendarState: 'SHOW'
    });
  }
  getTime() {
    const { format } = this.props;
    const { value } = this.state;
    let timeDate = value || new Date();
    let time = {};
    if (/(H|h)/.test(format)) {
      time.hours = timeDate.getHours();
    }
    if (/m/.test(format)) {
      time.minutes = timeDate.getMinutes();
    }
    if (/s/.test(format)) {
      time.seconds = timeDate.getSeconds();
    }
    return time;
  }

  getValue = () => (
    this.props.value || this.state.value || undefined
  )

  getDefaultPageDate() {
    let retDate = new Date();
    return retDate;
  }

  getDateString() {
    const { placeholder } = this.props;
    const value = this.getValue();
    return value ? moment(value).format(this.props.format) : placeholder;
  }

  handleChangePageDate = (nextPageDate) => {
    this.setState({
      missDate: true,
      pageDate: nextPageDate,
      calendarState: 'SHOW'
    });
  }
  handleChangePageTime = (nextPageTime) => {
    this.setState({
      pageDate: nextPageTime
    });
  }

  resetPageDate() {
    const value = this.getValue() || this.getDefaultPageDate();
    this.setState({ pageDate: value });
  }

  show() {
    this.resetPageDate();
    this.setState({
      calendarState: 'SHOW',
    });
  }

  hide = () => {
    this.setState({
      calendarState: 'HIDE',
      missDate: false
    });
  }

  toggle = () => {
    const { calendarState } = this.state;
    if (calendarState === 'SHOW') {
      this.hide();
    }
    if (calendarState === 'HIDE') {
      this.show();
    }
    if (calendarState === 'DROP_MONTH') {
      this.hide();
    }
  }

  showMonthDropdown() {
    this.setState({ calendarState: 'DROP_MONTH' });
  }

  hideMonthDropdown() {
    this.setState({ calendarState: 'SHOW' });
  }

  showTimeDropdown() {
    this.setState({ calendarState: 'DROP_TIME' });
  }

  hideTimeDropdown() {
    this.setState({ calendarState: 'SHOW' });
  }

  toggleMonthDropdown = () => {
    const { calendarState } = this.state;
    if (calendarState === 'DROP_MONTH') {
      this.hideMonthDropdown();
    } else {
      this.showMonthDropdown();
    }
  }

  toggleTimeDropdown = () => {
    const { calendarState } = this.state;
    if (calendarState === 'DROP_TIME') {
      this.hideTimeDropdown();
    } else {
      this.showTimeDropdown();
    }
  }

  reset = () => {
    this.setState({
      value: null,
      pageDate: this.getDefaultPageDate(),
      calendarState: 'HIDE'
    });
  }


  shouldMountCalendar() {
    const { format } = this.props;
    return /(Y|M|D)/.test(format);
  }

  shouldMountTime() {
    const { format } = this.props;
    return /(H|h|m|s)/.test(format);
  }

  handleTimeChange = (v) => {
    const { onChange } = this.props;
    const { value } = this.state;
    const { hours, minutes, seconds } = v;
    let nextValue = value
      ? new Date(value)
      : new Date();
    hours !== undefined && nextValue.setHours(hours);
    minutes !== undefined && nextValue.setMinutes(minutes);
    seconds !== undefined && nextValue.setSeconds(seconds);

    this.setState({ value: nextValue });
    onChange && onChange(nextValue);
  }

  handleSelect = (day) => {
    const { onChange, autoClose } = this.props;
    const { value } = this.state;

    if (autoClose) {
      this.hide();
    }

    let time = value || (new Date());
    let nextValue = new Date(day);

    // merge time into nextSelected
    nextValue.setHours(time.getHours());
    nextValue.setMinutes(time.getMinutes());
    nextValue.setSeconds(time.getSeconds());

    this.setState({
      missDate: false,
      value: nextValue,
      pageDate: nextValue
    });
    onChange && onChange(day);
  }

  render() {
    const {
      dateFilter,
      inline,
      className
    } = this.props;

    const {
      calendarState,
      pageDate,
      missDate
    } = this.state;

    const value = this.getValue();
    const shouldMountCalendar = this.shouldMountCalendar();
    const shouldMountTime = this.shouldMountTime();

    const paneClasses = classNames('rsuite-datepicker-pane', {
      hide: calendarState === 'HIDE',
      datetime: shouldMountCalendar && shouldMountTime
    });

    const calendar = (
      <Calendar
        missDate={missDate}
        time={shouldMountTime ? this.getTime() : null}
        calendarState={calendarState}
        selectedDate={value}
        pageDate={pageDate}
        onMoveForword={this.onMoveForword}
        onMoveBackward={this.onMoveBackward}
        onSelect={this.handleSelect}
        onToggleMonthDropdown={this.toggleMonthDropdown}
        onToggleTimeDropdown={this.toggleTimeDropdown}
        onChangePageDate={this.handleChangePageDate}
        onChangePageTime={this.handleChangePageTime}
        dateFilter={dateFilter}
        ref={(ref) => {
          this.calendar = ref;
        }}
      />
    );

    if (inline) {
      return (
        <div className="rsuite-datepicker inline">
          {calendar}
        </div>
      );
    }

    const classes = classNames('rsuite-datepicker', {
      'date-picker-dropdown': !inline
    }, className);

    return (
      <RootCloseWrapper onRootClose={this.hide}>
        <div className={classes}>
          <DateContainer
            placeholder={this.getDateString()}
            onClick={this.toggle}
            showCleanButton={!this.props.value && !!value}
            onClean={value && this.reset}
          />
          <div
            className={paneClasses}
          >
            {calendar}
          </div>
        </div>
      </RootCloseWrapper>
    );
  }
}

DatePicker.propTypes = propTypes;
DatePicker.contextTypes = contextTypes;
DatePicker.childContextTypes = childContextTypes;
DatePicker.defaultProps = defaultProps;

export default DatePicker;
