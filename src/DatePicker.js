import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import { findDOMNode } from 'react-dom';
import RootCloseWrapper from 'rsuite/lib/fixtures/RootCloseWrapper';
import _ from 'lodash';
import DateContainer from './DateContainer';
import Calendar from './Calendar';
import { transitionEndDetect } from './utils/eventDetect';
import calendarPropTypes from './calendarPropTypes';

const propTypes = {
  ...calendarPropTypes,
  defaultValue: PropTypes.instanceOf(moment),
  value: PropTypes.instanceOf(moment),
  autoClose: PropTypes.bool,
  placeholder: PropTypes.string,
  format: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  locale: PropTypes.object,
  inline: PropTypes.bool
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
    this.setState({
      pageDate: pageDate.add(pageChanges, 'month'),
      calendarState: 'SHOW'
    });
  }

  getTime() {
    const { format } = this.props;
    const { pageDate } = this.state;
    let timeDate = pageDate || moment();
    let time = {};
    if (/(H|h)/.test(format)) {
      time.hours = timeDate.hours();
    }
    if (/m/.test(format)) {
      time.minutes = timeDate.minutes();
    }
    if (/s/.test(format)) {
      time.seconds = timeDate.seconds();
    }
    return time;
  }

  getValue = () => (
    this.props.value || this.state.value || undefined
  )

  getDefaultPageDate() {
    let retDate = moment();
    return retDate;
  }

  getDateString() {
    const { placeholder } = this.props;
    const value = this.getValue();
    return value ? moment(value).format(this.props.format) : placeholder;
  }

  handleChangePageDate = (nextPageDate) => {
    this.setState({
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
      calendarState: 'HIDE'
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

  handleSelect = (nextValue) => {
    const { onChange, autoClose } = this.props;
    const { pageDate } = this.state;

    if (autoClose) {
      this.hide();
    }

    nextValue.hours(pageDate.hours())
      .minutes(pageDate.minutes())
      .seconds(pageDate.seconds());


    this.setState({
      value: nextValue,
      pageDate: nextValue
    });

    onChange && onChange(nextValue);
  }

  render() {
    const {
      disabledDate,
      inline,
      className,
      ...props
    } = this.props;

    const {
      calendarState,
      pageDate
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
        {..._.pick(props, Object.keys(calendarPropTypes))}
        time={shouldMountTime ? this.getTime() : null}
        calendarState={calendarState}
        pageDate={pageDate}
        onMoveForword={this.onMoveForword}
        onMoveBackward={this.onMoveBackward}
        onSelect={this.handleSelect}
        onToggleMonthDropdown={this.toggleMonthDropdown}
        onToggleTimeDropdown={this.toggleTimeDropdown}
        onChangePageDate={this.handleChangePageDate}
        onChangePageTime={this.handleChangePageTime}
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
DatePicker.childContextTypes = childContextTypes;
DatePicker.defaultProps = defaultProps;

export default DatePicker;
