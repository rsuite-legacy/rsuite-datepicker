import React, { PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import MonthHeader from './MonthHeader.js';
import WeekHeader from './WeekHeader.js';

const Week = ({ weekendDate, selected = new Date(), onClick, dateFilter }) => (
    <div className="week">
    {
        (() => {
            let days = [];
            for(let i = 0; i < 7; i++) {
                let thisDate = new Date(weekendDate);
                thisDate.setDate(weekendDate.getDate() + i);
                let className = 'week-day';
                className += dateFilter(thisDate) ? '' : ' disable';
                className += thisDate.toDateString() === (new Date()).toDateString()
                    ? ' is-today' : '';
                className += thisDate.toDateString() === selected.toDateString()
                    ? ' selected' : '';
                days.push(
                    <div
                        className={className}
                        onClick={onClick && dateFilter(thisDate) && onClick.bind(null, thisDate)}
                        key={i}
                        >
                        { thisDate.getDate() }
                    </div>
                );
            }
            return days;
        })()
    }
    </div>
);

Week.propTypes = {
    weekendDate: PropTypes.instanceOf(Date),
    selected: PropTypes.instanceOf(Date),
    onClick: PropTypes.func,
    dateFilter: PropTypes.func
};

const Weeks = ({ weeks, selected, onClick, dateFilter }) => (
    <div className="weeks">
    {
        weeks.map( (week, i) =>
            <Week
                key={i}
                weekendDate={week}
                selected={selected}
                onClick={onClick}
                dateFilter={dateFilter}
            />
        )
    }
    </div>
);

Weeks.propTypes = {
    weeks: PropTypes.array,
    selected: PropTypes.instanceOf(Date),
    onClick: PropTypes.func,
    dateFilter: PropTypes.func
};

const MonthView = ({ date, selected, onClick, dateFilter }) => {
    /**
     * Get all weeks of this month
     * @params date
     * @return date[]
     */
    function getMonthView(date) {
        const thisMonth = date.getMonth();
        let firstDayOfMonth = date.getDay();
        let distance = 0 - firstDayOfMonth;
        let firstWeekendDate = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate() + distance
                );
        let weeks = [firstWeekendDate];
        let nextWeekendDate = new Date(firstWeekendDate);
        nextWeekendDate.setDate(nextWeekendDate.getDate() + 7);
        while(thisMonth === nextWeekendDate.getMonth()) {
            weeks.push(nextWeekendDate);
            nextWeekendDate = new Date(nextWeekendDate);
            nextWeekendDate.setDate(nextWeekendDate.getDate() + 7);
        }
        return weeks;
    }

    // is two date in the same month
    function inSameMonth(dateA, dateB) { return dateA.getMonth() === dateB.getMonth(); }

    let thisMonthDate = new Date(date);
    let prevMonthDate = new Date(thisMonthDate);
    prevMonthDate.setMonth(thisMonthDate.getMonth() - 1);
    let nextMonthDate = new Date(thisMonthDate);
    nextMonthDate.setMonth(thisMonthDate.getMonth() + 1);
    return (
        <div className="monthView">
            <div className="monthView-weeksWrapper">
            <Weeks
                weeks={getMonthView(prevMonthDate)}
                selected={selected}
                dateFilter={date => inSameMonth(date, prevMonthDate) && dateFilter(date)}
            />
            <Weeks
                weeks={getMonthView(thisMonthDate)}
                selected={selected}
                onClick={onClick}
                dateFilter={date => inSameMonth(date, thisMonthDate) && dateFilter(date)}
            />
            <Weeks
                weeks={getMonthView(nextMonthDate)}
                selected={selected}
                dateFilter={date => inSameMonth(date, nextMonthDate) && dateFilter(date)}
            />
            </div>
        </div>
    );
};

MonthView.propTypes = {
    date: PropTypes.instanceOf(Date),
    selected: PropTypes.instanceOf(Date),
    onClick: PropTypes.func,
    dateFilter: PropTypes.func
};

const EditPanel = React.createClass({
    propTypes: {
        date: PropTypes.instanceOf(Date),
        onClick: PropTypes.func
    },

    scrollTo(date) {
        const year = date.getFullYear();
        const topSpacing = 10;
        const blockHeight = 64;
        const startYear = 1950;
        const el = findDOMNode(this.refs.content);
        const scrollTop = (year - startYear) * blockHeight + topSpacing;
        el.scrollTop = scrollTop;
    },

    componentDidMount() {
        const { date } = this.props;
        date && this.scrollTo(date);
    },

    render() {
        const { date, onClick } = this.props;
        return (
            <div className="editPanel">
                <div className="editPanel-content" ref="content">
                <div className="editPanel-scroll">
                {
                    (() => {
                        let ret = [];
                        let selectedMonth = date.getMonth();
                        let selectedYear = date.getFullYear();
                        let startYear = 1950;
                        for(let i = 0; i < 100; i++) {
                            let curYear = startYear + i;
                            let isSelectedYear = curYear === selectedYear;
                            let yearBlock = (
                                    <div className="editPanel-yearBlock" key={i}>
                                    <div className={'editPanel-yearTitle' + (isSelectedYear ? ' selected' : '')}>{curYear}</div>
                                    <div className='editPanel-monthBlock'>
                                    {
                                        [...Array(12).keys()].map( dateMonth =>
                                                <div
                                                    className={'editPanel-monthCell' + (isSelectedYear && dateMonth === selectedMonth ? ' selected' : '')}
                                                    onClick={onClick.bind(null, new Date(curYear, dateMonth))}
                                                    key={dateMonth}
                                                    >
                                                    {dateMonth + 1}
                                                </div>
                                        )
                                    }
                                    </div>
                                    </div>
                            );
                            ret.push(yearBlock);
                        }
                        return ret;
                    })()
                }
                </div>
                </div>
            </div>
        );
    }
});

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

    shouldComponentUpdate( nextProps, nextState  ) {
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
        if(dateA && dateB) {
            return dateA.toDateString() !== dateB.toDateString();
        } else if(!dateA && !dateB) {
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
            'SLIDING_L': ' sliding-left',
            'SLIDING_R': ' sliding-right',
            'EDITING': ' is-editing'
        }[calendarState] || '';

        let isEditingPageDate = calendarState === 'EDITING';
        return (
            <div className={'calendar' + stateClassname}>
                <MonthHeader
                    date={pageDate}
                    onMoveForword={this.onMoveForword}
                    onMoveBackward={this.onMoveBackward}
                    onClickTitle={onClickTitle}
                />
                { isEditingPageDate && <EditPanel
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
        if(minDate && date.getTime() < minDate.getTime()) return false;
        if(maxDate && date.getTime() > maxDate.getTime()) return false;
        if(dateFilter && !dateFilter(date)) return false;
        return true;
    }
});

export default Calendar;
