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
import decorate from './utils/decorate';
import { IntlProvider } from './intl';
import defaultLocale from './locale';

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
  inline: PropTypes.bool,
  renderPlaceholder: PropTypes.func
};

const defaultProps = {
  format: 'YYYY-MM-DD',
  autoClose: true,
  placeholder: '',
  locale: defaultLocale
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

  componentDidMount() {
    const { transitionSupport } = this.state;
    let el = findDOMNode(this.calendar);
    if (transitionSupport.supported && el) {
      el.addEventListener(transitionSupport.event, (e) => {
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
    this.setState({
      value: null,
      pageDate: this.getDefaultPageDate(),
      calendarState: 'HIDE'
    });
  }

  handleSelect = (nextValue) => {
    const { pageDate } = this.state;


    nextValue.hours(pageDate.hours())
      .minutes(pageDate.minutes())
      .seconds(pageDate.seconds());

    this.setState({
      pageDate: nextValue
    });

    // onChange && onChange(nextValue);
  }

  render() {
    const {
      inline,
      className,
      format,
      defaultClassName,
      locale,
      renderPlaceholder,
      ...props
    } = this.props;

    const {
      calendarState,
      pageDate
    } = this.state;

    const value = this.getValue();

    const paneClasses = classNames(this.prefix('pane'), {
      hide: calendarState === 'HIDE'
    });

    const calendar = (
      <Calendar
        {..._.pick(props, Object.keys(calendarPropTypes)) }
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
        ref={(ref) => {
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
        <div className={classes}>
          <IntlProvider locale={locale}>
            <div>
              <DateContainer
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
                <div className={this.prefix('toolbar')}>
                  sdfsdfsdf
              </div>
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
