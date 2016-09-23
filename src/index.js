import React, { PropTypes } from 'react';
import moment from 'moment';
import { findDOMNode } from 'react-dom';
import DateContainer from './DateContainer.js';
import Calendar from './Calendar.js';
import { transitionEndDetect } from './utils/eventDetect.js';
import RootCloseWrapper from 'rsuite/lib/fixtures/RootCloseWrapper.js';

const DatePicker = React.createClass({
    propTypes: {
        selected: PropTypes.instanceOf(Date),
        minDate: PropTypes.instanceOf(Date),
        maxDate: PropTypes.instanceOf(Date),
        format: PropTypes.string,
        onSelect: PropTypes.func
    },

    contextTypes: {
        formGroup: React.PropTypes.object
    },

    getFormGroup() {
        return this.context.formGroup || {};
    },

    getValue() {
        const { value } = this.getFormGroup();

        if(value && !/Invalid|NaN/.test(new Date(value))){
            return new Date(value);
        }
        return this.state.selected || undefined;
    },

    getDefaultProps() {
        return {
            format:'YYYY-MM-DD'
        };
    },

    getInitialState() {
        const { selected } = this.props;
        let ret = transitionEndDetect();
        return {
            selected: selected,
            pageDate: selected
                        ? new Date(selected.getFullYear(), selected.getMonth())
                        : this.getDefaultPageDate(),
            calendarState: 'HIDE',
            transitionSupport: ret
        };
    },

    reset() {
        this.setState({
            selected: null,
            pageDate: this.getDefaultPageDate(),
            calendarState: 'HIDE'
        });
        const { onChange } = this.getFormGroup();
        onChange && onChange(null);
    },

    getDefaultPageDate() {
        const { minDate, maxDate } = this.props;
        let retDate = new Date();
        if(minDate && retDate.getTime() < minDate.getTime()) retDate = minDate;
        if(maxDate && retDate.getTime() > maxDate.getTime()) retDate = maxDate;
        return retDate;
    },

    getDateString() {
        const selected = this.getValue();
        return selected ? moment(selected).format(this.props.format) : '';
    },

    resetPageDate() {
        const selected = this.getValue() || this.getDefaultPageDate();
        let pageDate = new Date(selected.getFullYear(), selected.getMonth());
        this.setState({ pageDate });
    },

    show() {
        this.resetPageDate();
        this.setState({ calendarState: 'SHOW' });
    },

    hide() {
        this.setState({ calendarState: 'HIDE'});
    },

    toggle() {
        const { calendarState } = this.state;
        if(calendarState === 'SHOW') this.hide();
        if(calendarState === 'HIDE') this.show();
        if(calendarState === 'EDITING') this.hide();
    },

    showEditPanel() {
        this.setState({ calendarState: 'EDITING' });
    },

    hideEditPanel() {
        this.setState({ calendarState: 'SHOW' });
    },

    toggleEditPanel() {
        const { calendarState } = this.state;
        if(calendarState === 'EDITING') this.hideEditPanel();
        if(calendarState === 'SHOW') this.showEditPanel();
    },

    onMoveForword(nextPageDate) {
        const { transitionSupport } = this.state;
        if(!transitionSupport.supported) {
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
        if(!transitionSupport.supported) {
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
        if(calendarState === 'SLIDING_L') pageChanges = 1;
        if(calendarState === 'SLIDING_R') pageChanges = -1;
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

    onSelect(day) {
        const { onSelect } = this.props;
        const { onChange } = this.getFormGroup();
        this.hide();
        this.setState({ selected: day });
        onSelect && onSelect(day);
        onChange && onChange(day);
    },

    componentDidMount() {

        let yearScrollAmount = 0;
        let monthScrollAmount = 0;

        const { transitionSupport } = this.state;
        let el = findDOMNode(this.refs.calendar);
        if(transitionSupport.supported) {
            el.addEventListener(transitionSupport.event, e => {
                if(e.target.className === 'monthView-weeksWrapper'
                && e.propertyName === 'left') {
                    this.onMoveDone();
                }
            });
        }
    },

    render() {
        const {
            minDate,
            maxDate
        } = this.props;

        const {
            calendarState,
            pageDate
        } = this.state;

        const selected = this.getValue();

        return (
            <RootCloseWrapper onRootClose={this.hide}>
            <div className="DatePicker">
                <DateContainer
                    placeholder={this.getDateString()}
                    onClick={this.toggle}
                    onClean={selected && this.reset}
                />
                <Calendar
                    calendarState={calendarState}
                    selectedDate={selected}
                    pageDate={pageDate}
                    minDate={minDate}
                    maxDate={maxDate}
                    onMoveForword={this.onMoveForword}
                    onMoveBackward={this.onMoveBackward}
                    onSelect={this.onSelect}
                    onClickTitle={this.toggleEditPanel}
                    onChangePageDate={this.onChangePageDate}
                    ref="calendar"
                />
            </div>
            </RootCloseWrapper>
        );
    },
});

export default DatePicker;
