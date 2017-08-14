import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import RootCloseWrapper from 'rsuite-utils/lib/Overlay/RootCloseWrapper';
import _ from 'lodash';
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
  ranges: Toolbar.propTypes.ranges,
  defaultValue: PropTypes.instanceOf(moment),
  value: PropTypes.instanceOf(moment),
  placeholder: PropTypes.string,
  format: PropTypes.string,
  disabled: PropTypes.bool,
  locale: PropTypes.object,
  inline: PropTypes.bool,
  renderPlaceholder: PropTypes.func,
  onChange: PropTypes.func,
  onToggle: PropTypes.func,
  onSelect: PropTypes.func,
};

const defaultProps = {
  format: 'YYYY-MM-DD',
  placeholder: '',
  locale: defaultLocale
};

class DatePicker extends Component {
  constructor(props) {
    super(props);

    const { defaultValue, value } = props;
    const activeValue = value || defaultValue;
    const ret = transitionEndDetect();

    this.state = {
      value: activeValue,
      pageDate: activeValue || moment(),
      calendarState: 'HIDE',
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

  getValue = () => (this.props.value || this.state.value)

  getDateString() {
    const { placeholder, format } = this.props;
    const value = this.getValue();

    return value ? moment(value).format(this.props.format) : (
      <div className="placeholder-text">
        {placeholder || format}
      </div>
    );
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

  handleOK = () => {
    this.updateValue();
  }

  updateValue(nextPageDate, unclosed) {
    const { value, pageDate } = this.state;
    const { onChange } = this.props;
    const nextValue = !_.isUndefined(nextPageDate) ? nextPageDate : pageDate;

    this.setState({
      pageDate: nextValue || moment(),
      value: nextValue
    });

    if (nextValue !== value || !nextValue.isSame(value)) {
      onChange && onChange(nextValue);
    }

    if (!unclosed) {
      this.hide();
    }

  }

  resetPageDate() {
    const value = this.getValue();
    this.setState({
      pageDate: value || moment()
    });
  }

  show() {

    const { onToggle } = this.props;
    this.resetPageDate();
    this.setState({
      calendarState: 'SHOW',
    });

    onToggle && onToggle(true);
  }

  hide = () => {

    const { onToggle } = this.props;
    this.setState({
      calendarState: 'HIDE'
    });

    onToggle && onToggle(false);
  }

  toggle = () => {

    const { calendarState } = this.state;

    if (calendarState === 'SHOW') {
      this.hide();
    } else if (calendarState === 'HIDE') {
      this.show();
    } else if (calendarState === 'DROP_MONTH') {
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
    const calendarProps = _.pick(this.props, Object.keys(calendarPropTypes));

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

  render() {
    const {
      inline,
      className,
      format,
      defaultClassName,
      locale,
      renderPlaceholder,
      disabled,
      ranges
    } = this.props;

    const {
      calendarState,
      pageDate
    } = this.state;

    const value = this.getValue();

    const paneClasses = classNames(this.prefix('pane'), {
      hide: calendarState === 'HIDE'
    });

    const calendarProps = _.pick(this.props, Object.keys(calendarPropTypes));
    const elementProps = _.omit(this.props, Object.keys(propTypes));

    const calendar = (
      <Calendar
        {...calendarProps}
        format={format}
        calendarState={calendarState}
        pageDate={pageDate}
        onMoveForword={this.onMoveForword}
        onMoveBackward={this.onMoveBackward}
        onSelect={this.handleSelect}
        onToggleMonthDropdown={this.toggleMonthDropdown}
        onToggleTimeDropdown={this.toggleTimeDropdown}
        onChangePageDate={this.handleChangePageDate}
        onChangePageTime={this.handleChangePageTime}
        calendarRef={(ref) => {
          this.calendar = ref;
        }}
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


    return (
      <RootCloseWrapper onRootClose={this.hide}>
        <div
          {...elementProps}
          className={classes}
        >
          <IntlProvider locale={locale}>
            <div>
              <DateContainer
                disabled={disabled}
                placeholder={this.getDateString()}
                onClick={this.toggle}
                showCleanButton={!this.props.value && !!value}
                onClean={value && this.reset}
                value={value}
                renderPlaceholder={renderPlaceholder}
              />
              <div
                className={paneClasses}
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
        </div>
      </RootCloseWrapper>
    );
  }
}

DatePicker.propTypes = propTypes;
DatePicker.defaultProps = defaultProps;

export default decorate()(DatePicker);
