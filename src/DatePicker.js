import React, { PropTypes } from 'react';
import moment from 'moment';
import { findDOMNode } from 'react-dom';
import DateContainer from './DateContainer.js';
import Calendar from './Calendar.js';
import Clock from './Clock.js';
import { transitionEndDetect } from './utils/eventDetect.js';
import RootCloseWrapper from 'rsuite/lib/fixtures/RootCloseWrapper.js';

const DatePicker = React.createClass({
    propTypes: {
        defaultValue: PropTypes.instanceOf(Date),
        value: PropTypes.instanceOf(Date),
        minDate: PropTypes.instanceOf(Date),
        maxDate: PropTypes.instanceOf(Date),
        autoClose: PropTypes.bool,
        placeholder: PropTypes.string,
        dateFormat: PropTypes.string,
        onChange: PropTypes.func,
        dateFilter: PropTypes.func
    },

    contextTypes: {
        formGroup: React.PropTypes.object
    },

    getDefaultProps() {
        return {
            dateFormat: 'YYYY-MM-DD',
            autoClose: true,
            placeholder: ''
        };
    },

    getInitialState() {
        const { defaultValue, value } = this.props;
        const activeValue = value || defaultValue;
        let ret = transitionEndDetect();

        return {
            value: activeValue,
            pageDate: activeValue
                ? new Date(activeValue.getFullYear(), activeValue.getMonth())
                : this.getDefaultPageDate(),
            calendarState: 'HIDE',
            transitionSupport: ret
        };
    },
    handleTimeChange(v) {
        const { onChange: onFormChange } = this.getFormGroup();
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
        onFormChange && onFormChange(nextValue);
        onChange && onChange(nextValue);
    },

    getTime() {
        const { dateFormat } = this.props;
        const { value } = this.state;
        let timeDate = value || new Date();
        let time = {};
        if (/(H|h)/.test(dateFormat))
            time.hours = timeDate.getHours();
        if (/m/.test(dateFormat))
            time.minutes = timeDate.getMinutes();
        if (/s/.test(dateFormat))
            time.seconds = timeDate.getSeconds();
        return time;
    },

    shouldMountCalendar() {
        const { dateFormat } = this.props;
        return /(Y|M|D)/.test(dateFormat);
    },

    shouldMountClock() {
        const { dateFormat } = this.props;
        return /(H|h|m|s)/.test(dateFormat);
    },

    getFormGroup() {
        return this.context.formGroup || {};
    },

    getValue() {
        const { value: fieldValue } = this.getFormGroup();
        const { value } = this.props;

        if (fieldValue && !/Invalid|NaN/.test(new Date(fieldValue))) {
            return new Date(fieldValue);
        } else if (value) {
            return value;
        }

        return this.state.value || undefined;
    },

    reset() {
        this.setState({
            value: null,
            pageDate: this.getDefaultPageDate(),
            calendarState: 'HIDE'
        });
        const { onChange } = this.getFormGroup();
        onChange && onChange(null);
    },

    getDefaultPageDate() {
        const { minDate, maxDate } = this.props;
        let retDate = new Date();
        if (minDate && retDate.getTime() < minDate.getTime()) retDate = minDate;
        if (maxDate && retDate.getTime() > maxDate.getTime()) retDate = maxDate;
        return retDate;
    },

    getDateString() {
        const { placeholder } = this.props;
        const value = this.getValue();
        return value ? moment(value).format(this.props.dateFormat) : placeholder;
    },

    resetPageDate() {
        const value = this.getValue() || this.getDefaultPageDate();
        let pageDate = new Date(value.getFullYear(), value.getMonth());
        this.setState({ pageDate });
    },

    show() {
        this.resetPageDate();
        this.setState({ calendarState: 'SHOW' });
    },

    hide() {
        const { onBlur } = this.getFormGroup();
        onBlur && onBlur();
        this.setState({ calendarState: 'HIDE' });
    },

    toggle() {
        const { calendarState } = this.state;
        if (calendarState === 'SHOW') this.hide();
        if (calendarState === 'HIDE') this.show();
        if (calendarState === 'EDITING') this.hide();
    },

    showEditPanel() {
        this.setState({ calendarState: 'EDITING' });
    },

    hideEditPanel() {
        this.setState({ calendarState: 'SHOW' });
    },

    toggleEditPanel() {
        const { calendarState } = this.state;
        if (calendarState === 'EDITING') this.hideEditPanel();
        if (calendarState === 'SHOW') this.showEditPanel();
    },

    onMoveForword(nextPageDate) {
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
    },

    onMoveBackward(nextPageDate) {
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
    },

    onMoveDone() {
        const { calendarState, pageDate } = this.state;
        let pageChanges = 0;
        if (calendarState === 'SLIDING_L') pageChanges = 1;
        if (calendarState === 'SLIDING_R') pageChanges = -1;
        let nextPageDate = new Date(pageDate.getFullYear(), pageDate.getMonth() + pageChanges);
        this.setState({
            pageDate: nextPageDate,
            calendarState: 'SHOW'
        });
    },

    onChangePageDate(nextPageDate) {
        this.setState({
            pageDate: nextPageDate,
            calendarState: 'SHOW'
        });
    },

    setMinDate(date) {
        this.setState({ minDate: date });
    },

    setMaxDate(date) {
        this.setState({ maxDate: date });
    },

    handleSelect(day) {
        const { onChange, autoClose } = this.props;
        const { value } = this.state;
        const { onChange: onFormChange } = this.getFormGroup();

        if (autoClose) this.hide();

        let time = value || (new Date());
        let nextValue = new Date(day);

        // merge time into nextSelected
        nextValue.setHours(time.getHours());
        nextValue.setMinutes(time.getMinutes());
        nextValue.setSeconds(time.getSeconds());

        this.setState({ value: nextValue });
        onChange && onChange(day);
        onFormChange && onFormChange(day);
    },
    componentDidMount() {

        const { transitionSupport } = this.state;
        let el = findDOMNode(this.refs.calendar);
        if (transitionSupport.supported && el) {
            el.addEventListener(transitionSupport.event, e => {
                if (e.target.className === 'monthView-weeksWrapper'
                    && e.propertyName === 'left') {
                    this.onMoveDone();
                }
            });
        }
    },
    render() {
        const {
            minDate,
            maxDate,
            dateFilter
        } = this.props;

        const {
            calendarState,
            pageDate
        } = this.state;

        const value = this.getValue();
        const shouldMountCalendar = this.shouldMountCalendar();
        const shouldMountClock = this.shouldMountClock();



        return (
            <RootCloseWrapper onRootClose={this.hide}>
                <div className="DatePicker">
                    <DateContainer
                        placeholder={this.getDateString()}
                        onClick={this.toggle}
                        showCleanButton={!this.props.value && value}
                        onClean={value && this.reset}
                    />
                    <div
                        className={
                            'DatePicker-pane' +
                            (calendarState === 'HIDE' ? ' hide' : '') +
                            ((shouldMountCalendar && shouldMountClock) ? ' datetime' : '')
                        }
                    >
                        {
                            shouldMountCalendar &&
                            <Calendar
                                calendarState={calendarState}
                                selectedDate={value}
                                pageDate={pageDate}
                                minDate={minDate}
                                maxDate={maxDate}
                                onMoveForword={this.onMoveForword}
                                onMoveBackward={this.onMoveBackward}
                                onSelect={this.handleSelect}
                                onClickTitle={this.toggleEditPanel}
                                onChangePageDate={this.onChangePageDate}
                                dateFilter={dateFilter}
                                ref="calendar"
                            />
                        }
                        {
                            shouldMountClock &&
                            <Clock
                                time={this.getTime()}
                                onChange={this.handleTimeChange}
                            />
                        }
                    </div>
                </div>
            </RootCloseWrapper>
        );
    }
});

export default DatePicker;
