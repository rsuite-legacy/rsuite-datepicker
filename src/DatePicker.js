import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import { on, getWidth } from 'dom-lib';
import merge from 'lodash/merge';
import omit from 'lodash/omit';
import isEqual from 'lodash/isEqual';
import pick from 'lodash/pick';
import isUndefined from 'lodash/isUndefined';
import DateContainer from './DateContainer';
import Calendar from './Calendar';
import { transitionEndDetect } from './utils/eventDetect';
import calendarPropTypes from './calendarPropTypes';
import decorate from './utils/decorate';
import { IntlProvider } from './intl';
import defaultLocale from './locale';
import Toolbar from './Toolbar';

const propTypes = {
  ...calendarPropTypes,
  align: PropTypes.oneOf(['right', 'left']),
  ranges: Toolbar.propTypes.ranges,
  defaultValue: PropTypes.instanceOf(moment),
  value: PropTypes.instanceOf(moment),
  calendarDefaultDate: PropTypes.instanceOf(moment),
  placeholder: PropTypes.string,
  renderPlaceholder: PropTypes.func,
  format: PropTypes.string,
  disabled: PropTypes.bool,
  /* eslint-disable */
  locale: PropTypes.object,
  inline: PropTypes.bool,
  onChange: PropTypes.func,
  onToggle: PropTypes.func,
  onToggleMonthDropdown: PropTypes.func,
  onToggleTimeDropdown: PropTypes.func,
  onSelect: PropTypes.func,
  onPrevMonth: PropTypes.func,
  onNextMonth: PropTypes.func,
  onOk: PropTypes.func,
  cleanable: PropTypes.bool,
  isoWeek: PropTypes.bool,
  yearCeiling: PropTypes.number
};

const defaultProps = {
  yearCeiling: 5,
  align: 'left',
  format: 'YYYY-MM-DD',
  placeholder: '',
  cleanable: true
};

class DatePicker extends Component {
  constructor(props) {
    super(props);

    const { defaultValue, value, calendarDefaultDate } = props;
    const activeValue = value || defaultValue;
    const ret = transitionEndDetect();

    this.state = {
      value: activeValue,
      forceOpen: false,
      calendarState: 'HIDE',
      toggleWidth: 0,
      locale: merge({}, defaultLocale(props.isoWeek), props.locale),
      pageDate: activeValue || calendarDefaultDate || moment(),  // display calendar date
      transitionSupport: ret
    };
  }

  componentDidMount() {
    const { transitionSupport } = this.state;
    if (transitionSupport.supported && this.calendar) {
      this.calendar.addEventListener(transitionSupport.event, (e) => {
        if (e.target.className === 'month-view-weeks-wrapper' && e.propertyName === 'left') {
          this.onMoveDone();
        }
      });
    }
    this.isMounted = true;
  }

  componentWillReceiveProps(nextProps) {
    const { value, calendarDefaultDate, locale } = this.props;

    if (nextProps.value && !nextProps.value.isSame(value, 'day')) {
      this.setState({ value: nextProps.value });
    }

    if (
      nextProps.calendarDefaultDate &&
      !nextProps.calendarDefaultDate.isSame(calendarDefaultDate, 'day')
    ) {
      this.setState({ calendarDefaultDate: nextProps.calendarDefaultDate });
    }

    if (isEqual(nextProps.locale, locale)) {
      this.setState({ locale: nextProps.locale });
    }

  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(nextProps, this.props) || !isEqual(nextState, this.state);
  }

  componentWillUnmount() {
    this.unbindEvent();
    this.isMounted = false;
  }

  onMoveForword = (nextPageDate) => {
    const { transitionSupport } = this.state;
    const { onNextMonth } = this.props;
    if (!transitionSupport.supported) {
      this.setState({
        pageDate: nextPageDate
      });
      return;
    }
    this.setState({
      calendarState: 'SLIDING_L'
    });
    onNextMonth && onNextMonth(nextPageDate);
  }

  onMoveBackward = (nextPageDate) => {
    const { transitionSupport } = this.state;
    const { onPrevMonth } = this.props;
    if (!transitionSupport.supported) {
      this.setState({
        pageDate: nextPageDate
      });
      return;
    }
    this.setState({
      calendarState: 'SLIDING_R'
    });
    onPrevMonth && onPrevMonth(nextPageDate);
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

  getValue = () => {
    const value = this.props.value || this.state.value;
    return value ? value.clone() : null;
  }

  getDateString() {
    const { placeholder, format } = this.props;
    const value = this.getValue();

    return value ? moment(value).format(this.props.format) : (
      <div className="placeholder-text">
        {placeholder || format}
      </div>
    );
  }

  get isMounted() {
    return this.mounted;
  }
  set isMounted(isMounted) {
    this.mounted = isMounted;
  }

  bindEvent() {
    this.docClickListener = on(document, 'click', this.handleDocumentClick);
  }

  unbindEvent() {
    this.docClickListener && this.docClickListener.off();
  }

  /**
   * Close menu when click document
   */
  handleDocumentClick = (event) => {
    if (this.isMounted && !this.container.contains(event.target) && !this.state.forceOpen) {
      this.handleClose();
    }
  }

  handleChangePageDate = (nextPageDate) => {
    const { onSelect } = this.props;
    this.setState({
      pageDate: nextPageDate,
      calendarState: 'SHOW'
    });
    onSelect && onSelect(nextPageDate);
  }

  handleChangePageTime = (nextPageTime) => {
    const { onSelect } = this.props;
    this.setState({
      pageDate: nextPageTime
    });
    onSelect && onSelect(nextPageTime);
  }

  handleShortcutPageDate = (pageDate, unclosed) => {
    const { onSelect } = this.props;
    this.updateValue(pageDate, unclosed);
    onSelect && onSelect(pageDate);
  }

  handleOK = (event) => {
    const { onOk } = this.props;
    this.updateValue();
    onOk && onOk(this.state.pageDate, event);
  }

  updateValue(nextPageDate, unclosed) {
    const { value, pageDate } = this.state;
    const { onChange } = this.props;
    const nextValue = !isUndefined(nextPageDate) ? nextPageDate : pageDate;

    this.setState({
      pageDate: nextValue || moment(),
      value: nextValue
    });

    if (nextValue !== value || !nextValue.isSame(value)) {
      onChange && onChange(nextValue ? nextValue.clone() : null);
    }

    if (!unclosed) {
      this.handleClose();
    }

  }

  resetPageDate() {
    const { calendarDefaultDate } = this.props;
    const value = this.getValue();
    this.setState({
      pageDate: value || calendarDefaultDate || moment()
    });
  }

  show() {
    const { disabled } = this.props;
    !disabled && this.handleOpen(true);
  }

  hide() {
    const { disabled } = this.props;
    !disabled && this.handleClose(true);
  }

  handleOpen = (forceOpen) => {

    const { onToggle } = this.props;
    this.resetPageDate();
    this.setState({
      calendarState: 'SHOW',
      forceOpen
    });

    onToggle && onToggle(true);
    forceOpen && this.cleanForce();
    this.bindEvent();
  }

  handleClose = (forceOpen) => {
    const { onToggle } = this.props;
    this.setState({
      calendarState: 'HIDE',
      forceOpen
    });

    onToggle && onToggle(false);
    forceOpen && this.cleanForce();
    this.unbindEvent();
  }

  cleanForce() {
    setTimeout(() => {
      this.setState({ forceOpen: false });
    }, 1000);
  }

  handleToggle = () => {

    const { calendarState } = this.state;

    if (calendarState === 'SHOW') {
      this.handleClose();
    } else if (calendarState === 'HIDE') {
      this.handleOpen();
      this.setState({
        toggleWidth: this.toggle ? getWidth(this.toggle) : 0
      });
    } else if (calendarState === 'DROP_MONTH') {
      this.handleClose();
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
    const { onToggleMonthDropdown } = this.props;
    let toggle;

    if (calendarState === 'DROP_MONTH') {
      this.hideMonthDropdown();
      toggle = false;
    } else {
      this.showMonthDropdown();
      toggle = true;
    }
    onToggleMonthDropdown && onToggleMonthDropdown(toggle);
  }

  toggleTimeDropdown = () => {
    const { calendarState } = this.state;
    const { onToggleTimeDropdown } = this.props;
    let toggle;
    if (calendarState === 'DROP_TIME') {
      this.hideTimeDropdown();
      toggle = false;
    } else {
      this.showTimeDropdown();
      toggle = true;
    }

    onToggleTimeDropdown && onToggleTimeDropdown(toggle);
  }

  reset = () => {
    this.setState({ pageDate: moment() });
    this.updateValue(null);
  }

  handleSelect = (nextValue) => {
    const { pageDate } = this.state;
    const { onSelect } = this.props;

    nextValue.hours(pageDate.hours())
      .minutes(pageDate.minutes())
      .seconds(pageDate.seconds());

    this.setState({
      pageDate: nextValue
    });

    onSelect && onSelect(nextValue);
  }

  disabledOkButton = (date) => {
    const calendarProps = pick(this.props, Object.keys(calendarPropTypes));

    return Object.keys(calendarProps).some((key) => {

      if (/(Hours)/.test(key)) {
        return calendarProps[key](date.hours(), date);
      }
      if (/(Minutes)/.test(key)) {
        return calendarProps[key](date.minutes(), date);
      }
      if (/(Seconds)/.test(key)) {
        return calendarProps[key](date.seconds(), date);
      }
      return calendarProps[key](date);
    });
  }

  bindRef = name => ref => {
    this[name] = ref;
  }

  bindCalendar = this.bindRef('calendar')

  bindContainer = this.bindRef('container')

  render() {
    const {
      inline,
      className,
      format,
      defaultClassName,
      renderPlaceholder,
      disabled,
      ranges,
      cleanable,
      align,
      isoWeek,
      yearCeiling
    } = this.props;

    const {
      calendarState,
      pageDate,
      locale,
      toggleWidth
    } = this.state;

    const value = this.getValue();
    const paneClasses = classNames(this.prefix('pane'), {
      hide: calendarState === 'HIDE'
    });

    const calendarProps = pick(this.props, Object.keys(calendarPropTypes));
    const elementProps = omit(this.props, Object.keys(propTypes));

    const calendar = (
      <Calendar
        {...calendarProps}
        yearCeiling={yearCeiling}
        format={format}
        isoWeek={isoWeek}
        calendarState={calendarState}
        pageDate={pageDate}
        onMoveForword={this.onMoveForword}
        onMoveBackward={this.onMoveBackward}
        onSelect={this.handleSelect}
        onToggleMonthDropdown={this.toggleMonthDropdown}
        onToggleTimeDropdown={this.toggleTimeDropdown}
        onChangePageDate={this.handleChangePageDate}
        onChangePageTime={this.handleChangePageTime}
        calendarRef={this.bindCalendar}
      />
    );

    if (inline) {
      return (
        <IntlProvider locale={locale}>
          <div className={`${defaultClassName} inline`}>
            {calendar}
          </div>
        </IntlProvider>
      );
    }


    const classes = classNames(defaultClassName, {
      [this.prefix('dropdown')]: !inline
    }, className);

    // pane width is 270px
    const paneStyles = {
      marginLeft: align === 'right' ? toggleWidth - 270 : 0
    };

    return (
      <IntlProvider locale={locale}>
        <div
          {...elementProps}
          className={classes}
          ref={this.bindContainer}
        >
          <DateContainer
            disabled={disabled}
            placeholder={this.getDateString()}
            onClick={this.handleToggle}
            showCleanButton={!!value && cleanable}
            onClean={(value && cleanable) ? this.reset : null}
            value={value}
            renderPlaceholder={renderPlaceholder}
            toggleRef={this.bindCalendar}
          />
          <div
            className={paneClasses}
            style={paneStyles}
          >
            {calendar}
            <Toolbar
              ranges={ranges}
              pageDate={pageDate}
              disabledOkButton={this.disabledOkButton}
              onShortcut={this.handleShortcutPageDate}
              onOk={this.handleOK}
            />
          </div>
        </div>
      </IntlProvider>
    );
  }
}

DatePicker.propTypes = propTypes;
DatePicker.defaultProps = defaultProps;

export default decorate()(DatePicker);
