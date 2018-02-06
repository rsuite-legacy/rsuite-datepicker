// @flow

import * as React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import _ from 'lodash';
import { IntlProvider } from 'rsuite-intl';
import OverlayTrigger from 'rsuite-utils/lib/Overlay/OverlayTrigger';
import { getUnhandledProps, prefix } from 'rsuite-utils/lib/utils';
import { MenuWrapper, Toggle, constants } from 'rsuite-utils/lib/Picker';

import Calendar from './Calendar';
import defaultLocale from './locale';
import Toolbar from './Toolbar';
import disabledTime, { calendarOnlyProps } from './utils/disabledTime';
import { shouldOnlyTime } from './utils/formatUtils';

const { namespace } = constants;

type PlacementEighPoints = 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight' | 'leftTop' | 'rightTop' | 'leftBottom' | 'rightBottom';
type Range = {
  label: React.Node,
  closeOverlay?: boolean,
  value: moment$Moment | (pageDate: moment$Moment)=> moment$Moment,
};

type Props = {
  disabledDate?: (date: moment$Moment) => boolean,
  disabledHours?: (hour: number, date: moment$Moment) => boolean,
  disabledMinutes?: (minute: number, date: moment$Moment) => boolean,
  disabledSeconds?: (second: number, date: moment$Moment) => boolean,
  hideHours?: (hour: number, date: moment$Moment) => boolean,
  hideMinutes?: (minute: number, date: moment$Moment) => boolean,
  hideSeconds?: (second: number, date: moment$Moment) => boolean,
  ranges?: Array<Range>,
  defaultValue?: moment$Moment,
  value?: moment$Moment,
  calendarDefaultDate?: moment$Moment,
  placeholder?: string,
  format: string,
  disabled?: boolean,
  locale?: Object,
  inline?: boolean,
  onChange?: (value: moment$Moment | null) => void,
  onToggleMonthDropdown?: (toggle: boolean) => void,
  onToggleTimeDropdown?: (toggle: boolean) => void,
  onSelect?: (date: moment$Moment, event?: SyntheticEvent<*>) => void,
  onPrevMonth?: (date: moment$Moment) => void,
  onNextMonth?: (date: moment$Moment) => void,
  onOk?: (date: moment$Moment, event: SyntheticEvent<*>) => void,
  cleanable?: boolean,
  isoWeek?: boolean,
  yearCeiling?: number,
  className?: string,
  classPrefix?: string,
  open?: boolean,
  defaultOpen?: boolean,
  placement?: PlacementEighPoints,
  onOpen?: () => void,
  onClose?: () => void
}

type States = {
  value?: moment$Moment,
  forceOpen?: boolean,
  calendarState?: 'DROP_MONTH' | 'DROP_TIME',
  locale?: Object,
  pageDate: moment$Moment
}

class DatePicker extends React.Component<Props, States> {

  static defaultProps = {
    classPrefix: `${namespace}-date`,
    placement: 'bottomLeft',
    yearCeiling: 5,
    format: 'YYYY-MM-DD',
    placeholder: '',
    cleanable: true
  };

  constructor(props: Props) {
    super(props);

    const { defaultValue, value, calendarDefaultDate } = props;
    const activeValue = value || defaultValue;

    this.state = {
      value: activeValue,
      forceOpen: false,
      calendarState: undefined,
      locale: _.merge({}, defaultLocale, props.locale),
      pageDate: activeValue || calendarDefaultDate || moment()  // display calendar date
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    const { value, locale } = this.props;

    if (nextProps.value && !nextProps.value.isSame(value, 'day')) {
      this.setState({ value: nextProps.value });
    }

    if (_.isEqual(nextProps.locale, locale)) {
      this.setState({ locale: _.merge({}, this.state.locale, nextProps.locale) });
    }
  }

  shouldComponentUpdate(nextProps: Props, nextState: States) {
    return !_.isEqual(nextProps, this.props) || !_.isEqual(nextState, this.state);
  }

  onMoveForword = (nextPageDate: moment$Moment) => {
    const { onNextMonth } = this.props;
    this.setState({
      pageDate: nextPageDate
    });
    onNextMonth && onNextMonth(nextPageDate);
  }

  onMoveBackward = (nextPageDate: moment$Moment) => {
    const { onPrevMonth } = this.props;
    this.setState({
      pageDate: nextPageDate
    });
    onPrevMonth && onPrevMonth(nextPageDate);
  }

  getValue = () => {
    const value = this.props.value || this.state.value;
    return value ? value.clone() : null;
  }

  getDateString() {
    const { placeholder, format } = this.props;
    const value = this.getValue();

    return value ? moment(value).format(this.props.format) : placeholder || format;
  }

  calendar = null;


  handleChangePageDate = (nextPageDate: moment$Moment) => {
    const { onSelect } = this.props;
    this.setState({
      pageDate: nextPageDate,
      calendarState: undefined
    });
    onSelect && onSelect(nextPageDate);
  }

  handleChangePageTime = (nextPageTime: moment$Moment) => {
    const { onSelect } = this.props;
    this.setState({
      pageDate: nextPageTime
    });
    onSelect && onSelect(nextPageTime);
  }

  handleShortcutPageDate = (
    value: moment$Moment,
    closeOverlay?: boolean,
    event?: SyntheticEvent<*>
  ) => {
    const { onSelect } = this.props;
    this.updateValue(value, closeOverlay);
    onSelect && onSelect(value, event);
  }

  handleOK = (event: SyntheticEvent<*>) => {
    const { onOk } = this.props;
    this.updateValue();
    onOk && onOk(this.state.pageDate, event);
  }

  updateValue(nextPageDate?: moment$Moment | null, closeOverlay?: boolean = true) {
    const { value, pageDate } = this.state;
    const { onChange } = this.props;
    const nextValue: any = !_.isUndefined(nextPageDate) ? nextPageDate : pageDate;

    this.setState({
      pageDate: nextValue || moment(),
      value: nextValue
    });

    if (nextValue !== value || !nextValue.isSame(value)) {
      onChange && onChange(nextValue ? nextValue.clone() : null);
    }

    // `closeOverlay` default value is `true`
    if (closeOverlay !== false) {
      this.close();
    }

  }

  resetPageDate() {
    const { calendarDefaultDate } = this.props;
    const value = this.getValue();
    this.setState({
      pageDate: value || calendarDefaultDate || moment()
    });
  }

  open() {
    if (this.trigger) {
      this.trigger.show();
    }
  }

  close() {
    if (this.trigger) {
      this.trigger.hide();
    }
  }

  showMonthDropdown() {
    this.setState({ calendarState: 'DROP_MONTH' });
  }

  hideMonthDropdown() {
    this.setState({ calendarState: undefined });
  }

  showTimeDropdown() {
    this.setState({ calendarState: 'DROP_TIME' });
  }

  hideTimeDropdown() {
    this.setState({ calendarState: undefined });
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

  handleClean = () => {
    this.setState({ pageDate: moment() });
    this.updateValue(null);
  }

  handleSelect = (nextValue: moment$Moment) => {
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

  disabledOkButton = (date: moment$Moment) => disabledTime(this.props, date)

  calendar = null;
  container = null;
  trigger = null;
  menuContainer = null;

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  renderCalendar() {
    const {
      format,
      isoWeek,
      yearCeiling,
      disabledDate
    } = this.props;

    const {
      calendarState,
      pageDate
    } = this.state;

    const calendarProps = _.pick(this.props, calendarOnlyProps);

    return (
      <Calendar
        {...calendarProps}
        disabledDate={disabledDate}
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
        calendarRef={(ref) => {
          this.calendar = ref;
        }}
      />
    );
  }
  renderDropdownMenu(calendar: React.Node) {
    const { placement, ranges } = this.props;
    const { pageDate } = this.state;
    const classes = classNames(
      this.addPrefix('menu'),
      `${namespace}-placement-${_.kebabCase(placement)}`
    );
    return (
      <MenuWrapper
        className={classes}
      >
        <div
          ref={(ref) => {
            // for test
            this.menuContainer = ref;
          }}
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
      </MenuWrapper>
    );
  }
  render() {
    const {
      inline,
      className,
      disabled,
      ranges,
      cleanable,
      open,
      defaultOpen,
      placement,
      onOpen,
      onClose,
      classPrefix,
      format,
      ...rest
    } = this.props;

    const { locale } = this.state;
    const value = this.getValue();
    const unhandled = getUnhandledProps(DatePicker, rest);
    const hasValue = !!value;
    const calendar = this.renderCalendar();

    if (inline) {
      return (
        <IntlProvider locale={locale}>
          <div className={classNames(classPrefix, this.addPrefix('inline'), className)}>
            {calendar}
          </div>
        </IntlProvider>
      );
    }

    const classes = classNames(classPrefix, {
      [this.addPrefix('has-value')]: hasValue,
      [this.addPrefix('disabled')]: disabled,
      [this.addPrefix('only-time')]: shouldOnlyTime(format)

    }, `${namespace}-placement-${_.kebabCase(placement)}`, className);

    return (
      <IntlProvider locale={locale}>
        <div
          {...unhandled}
          className={classes}
          ref={(ref) => {
            this.container = ref;
          }}
        >

          <OverlayTrigger
            ref={(ref) => {
              this.trigger = ref;
            }}
            open={open}
            defaultOpen={defaultOpen}
            disabled={disabled}
            trigger="click"
            placement={placement}
            onEntered={onOpen}
            onExited={onClose}
            speaker={this.renderDropdownMenu(calendar)}
          >

            <Toggle
              onClean={this.handleClean}
              cleanable={cleanable && !disabled}
              hasValue={!!value}
            >
              {this.getDateString()}
            </Toggle>
          </OverlayTrigger>

        </div>
      </IntlProvider>
    );
  }
}

export default DatePicker;
