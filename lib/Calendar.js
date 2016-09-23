'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError("Cannot destructure undefined"); }

var MonthHeader = function MonthHeader(_ref) {
    var date = _ref.date;
    var onMoveForword = _ref.onMoveForword;
    var onMoveBackward = _ref.onMoveBackward;
    var onClickTitle = _ref.onClickTitle;
    return _react2.default.createElement(
        'div',
        { className: 'monthHeader' },
        _react2.default.createElement(
            'i',
            { className: 'monthHeader-backward',
                onClick: onMoveBackward
            },
            String.fromCharCode(9664)
        ),
        _react2.default.createElement(
            'span',
            { className: 'monthHeader-title', onClick: onClickTitle },
            date.getFullYear() + ' - ' + (date.getMonth() + 1)
        ),
        _react2.default.createElement(
            'i',
            { className: 'monthHeader-forward',
                onClick: onMoveForword
            },
            String.fromCharCode(9654)
        )
    );
};

var WeekHeader = function WeekHeader(_ref2) {
    _objectDestructuringEmpty(_ref2);

    return _react2.default.createElement(
        'div',
        { className: 'weekHeader' },
        _react2.default.createElement(
            'span',
            { className: 'weekHeader-day' },
            'Sun'
        ),
        _react2.default.createElement(
            'span',
            { className: 'weekHeader-day' },
            'Mon'
        ),
        _react2.default.createElement(
            'span',
            { className: 'weekHeader-day' },
            'Tue'
        ),
        _react2.default.createElement(
            'span',
            { className: 'weekHeader-day' },
            'Wed'
        ),
        _react2.default.createElement(
            'span',
            { className: 'weekHeader-day' },
            'Thu'
        ),
        _react2.default.createElement(
            'span',
            { className: 'weekHeader-day' },
            'Fri'
        ),
        _react2.default.createElement(
            'span',
            { className: 'weekHeader-day' },
            'Sat'
        )
    );
};

var Week = function Week() {
    var _ref3 = arguments.length <= 0 || arguments[0] === undefined ? props : arguments[0];

    var weekendDate = _ref3.weekendDate;
    var _ref3$selected = _ref3.selected;
    var selected = _ref3$selected === undefined ? new Date() : _ref3$selected;
    var onClick = _ref3.onClick;
    var dateFilter = _ref3.dateFilter;
    return _react2.default.createElement(
        'div',
        { className: 'week' },
        function () {
            var days = [];
            for (var i = 0; i < 7; i++) {
                var thisDate = new Date(weekendDate);
                thisDate.setDate(weekendDate.getDate() + i);
                var className = "week-day";
                className += dateFilter(thisDate) ? '' : ' disable';
                className += thisDate.toDateString() === new Date().toDateString() ? ' is-today' : '';
                className += thisDate.toDateString() === selected.toDateString() ? ' selected' : '';
                days.push(_react2.default.createElement(
                    'div',
                    {
                        className: className,
                        onClick: onClick && dateFilter(thisDate) && onClick.bind(null, thisDate),
                        key: i
                    },
                    thisDate.getDate()
                ));
            }
            return days;
        }()
    );
};

var Weeks = function Weeks() {
    var _ref4 = arguments.length <= 0 || arguments[0] === undefined ? props : arguments[0];

    var weeks = _ref4.weeks;
    var selected = _ref4.selected;
    var onClick = _ref4.onClick;
    var dateFilter = _ref4.dateFilter;
    return _react2.default.createElement(
        'div',
        { className: 'weeks' },
        weeks.map(function (week, i) {
            return _react2.default.createElement(Week, {
                key: i,
                weekendDate: week,
                selected: selected,
                onClick: onClick,
                dateFilter: dateFilter
            });
        })
    );
};

var MonthView = function MonthView() {
    var _ref5 = arguments.length <= 0 || arguments[0] === undefined ? props : arguments[0];

    var date = _ref5.date;
    var selected = _ref5.selected;
    var onClick = _ref5.onClick;
    var _dateFilter = _ref5.dateFilter;

    /**
     * Get all weeks of this month
     * @params date
     * @return date[]
     */
    function getMonthView(date) {
        var thisMonth = date.getMonth();
        var firstDayOfMonth = date.getDay();
        var distance = 0 - firstDayOfMonth;
        var firstWeekendDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() + distance);
        var weeks = [firstWeekendDate];
        var nextWeekendDate = new Date(firstWeekendDate);
        nextWeekendDate.setDate(nextWeekendDate.getDate() + 7);
        while (thisMonth === nextWeekendDate.getMonth()) {
            weeks.push(nextWeekendDate);
            nextWeekendDate = new Date(nextWeekendDate);
            nextWeekendDate.setDate(nextWeekendDate.getDate() + 7);
        }
        return weeks;
    }

    // is two date in the same month
    function inSameMonth(dateA, dateB) {
        return dateA.getMonth() === dateB.getMonth();
    };

    var thisMonthDate = new Date(date);
    var prevMonthDate = new Date(thisMonthDate);
    prevMonthDate.setMonth(thisMonthDate.getMonth() - 1);
    var nextMonthDate = new Date(thisMonthDate);
    nextMonthDate.setMonth(thisMonthDate.getMonth() + 1);
    return _react2.default.createElement(
        'div',
        { className: 'monthView' },
        _react2.default.createElement(
            'div',
            { className: 'monthView-weeksWrapper' },
            _react2.default.createElement(Weeks, {
                weeks: getMonthView(prevMonthDate),
                selected: selected,
                dateFilter: function dateFilter(date) {
                    return inSameMonth(date, prevMonthDate) && _dateFilter(date);
                }
            }),
            _react2.default.createElement(Weeks, {
                weeks: getMonthView(thisMonthDate),
                selected: selected,
                onClick: onClick,
                dateFilter: function dateFilter(date) {
                    return inSameMonth(date, thisMonthDate) && _dateFilter(date);
                }
            }),
            _react2.default.createElement(Weeks, {
                weeks: getMonthView(nextMonthDate),
                selected: selected,
                dateFilter: function dateFilter(date) {
                    return inSameMonth(date, nextMonthDate) && _dateFilter(date);
                }
            })
        )
    );
};

var EditPanel = _react2.default.createClass({
    displayName: 'EditPanel',

    propTypes: {
        date: _react.PropTypes.instanceOf(Date),
        onClick: _react.PropTypes.func
    },

    scrollTo: function scrollTo(date) {
        var year = date.getFullYear();
        var topSpacing = 10;
        var blockHeight = 64;
        var startYear = 1950;
        var el = (0, _reactDom.findDOMNode)(this.refs.content);
        console.log(date, year - startYear);
        var scrollTop = (year - startYear) * blockHeight + topSpacing;
        el.scrollTop = scrollTop;
    },
    componentDidMount: function componentDidMount() {
        var date = this.props.date;

        date && this.scrollTo(date);
    },
    render: function render() {
        var _props = this.props;
        var date = _props.date;
        var onClick = _props.onClick;

        return _react2.default.createElement(
            'div',
            { className: 'editPanel' },
            _react2.default.createElement(
                'div',
                { className: 'editPanel-content', ref: 'content' },
                _react2.default.createElement(
                    'div',
                    { className: 'editPanel-scroll' },
                    function () {
                        var ret = [];
                        var selectedMonth = date.getMonth();
                        var selectedYear = date.getFullYear();
                        var startYear = 1950;

                        var _loop = function _loop(i) {
                            var curYear = startYear + i;
                            var isSelectedYear = curYear === selectedYear;
                            var yearBlock = _react2.default.createElement(
                                'div',
                                { className: 'editPanel-yearBlock', key: i },
                                _react2.default.createElement(
                                    'div',
                                    { className: "editPanel-yearTitle" + (isSelectedYear ? ' selected' : '') },
                                    curYear
                                ),
                                _react2.default.createElement(
                                    'div',
                                    { className: 'editPanel-monthBlock' },
                                    [].concat(_toConsumableArray(Array(12).keys())).map(function (dateMonth) {
                                        return _react2.default.createElement(
                                            'div',
                                            {
                                                className: "editPanel-monthCell" + (isSelectedYear && dateMonth === selectedMonth ? ' selected' : ''),
                                                onClick: onClick.bind(null, new Date(curYear, dateMonth)),
                                                key: dateMonth
                                            },
                                            dateMonth + 1
                                        );
                                    })
                                )
                            );
                            ret.push(yearBlock);
                        };

                        for (var i = 0; i < 100; i++) {
                            _loop(i);
                        }
                        return ret;
                    }()
                )
            )
        );
    }
});

var Calendar = _react2.default.createClass({
    displayName: 'Calendar',

    propTypes: {
        calendarState: _react.PropTypes.string,
        selectedDate: _react.PropTypes.instanceOf(Date),
        pageDate: _react.PropTypes.instanceOf(Date),
        minDate: _react.PropTypes.instanceOf(Date),
        maxDate: _react.PropTypes.instanceOf(Date),
        onMoveForword: _react.PropTypes.func,
        onMoveBackward: _react.PropTypes.func,
        onSelect: _react.PropTypes.func,
        onClickTitle: _react.PropTypes.func,
        onChangePageDate: _react.PropTypes.func
    },

    onMoveForword: function onMoveForword() {
        var _props2 = this.props;
        var onMoveForword = _props2.onMoveForword;
        var pageDate = _props2.pageDate;

        var nextPageDate = new Date(pageDate.getFullYear(), pageDate.getMonth() + 1);
        onMoveForword && onMoveForword(nextPageDate);
    },
    onMoveBackward: function onMoveBackward() {
        var _props3 = this.props;
        var onMoveBackward = _props3.onMoveBackward;
        var pageDate = _props3.pageDate;

        var nextPageDate = new Date(pageDate.getFullYear(), pageDate.getMonth() - 1);
        onMoveBackward && onMoveBackward(nextPageDate);
    },
    render: function render() {
        var _props4 = this.props;
        var calendarState = _props4.calendarState;
        var selectedDate = _props4.selectedDate;
        var pageDate = _props4.pageDate;
        var minDate = _props4.minDate;
        var maxDate = _props4.maxDate;
        var pageNumber = _props4.pageNumber;
        var onSelect = _props4.onSelect;
        var onClickTitle = _props4.onClickTitle;
        var onChangePageDate = _props4.onChangePageDate;

        var stateClassname = {
            'SHOW': '',
            'HIDE': ' is-hide',
            'SLIDING_L': ' sliding-left',
            'SLIDING_R': ' sliding-right',
            'EDITING': ' is-editing'
        }[calendarState];
        var dateFilter = function dateFilter(date) {
            if (minDate && date.getTime() < minDate.getTime()) return false;
            if (maxDate && date.getTime() > maxDate.getTime()) return false;
            return true;
        };
        var isEditingPageDate = calendarState === 'EDITING';
        return _react2.default.createElement(
            'div',
            { className: 'calendar' + stateClassname },
            _react2.default.createElement(MonthHeader, {
                date: pageDate,
                onMoveForword: this.onMoveForword,
                onMoveBackward: this.onMoveBackward,
                onClickTitle: onClickTitle
            }),
            isEditingPageDate && _react2.default.createElement(EditPanel, {
                date: pageDate,
                onClick: onChangePageDate
            }),
            _react2.default.createElement(WeekHeader, null),
            _react2.default.createElement(MonthView, {
                date: pageDate,
                selected: selectedDate,
                onClick: onSelect,
                dateFilter: dateFilter
            })
        );
    }
});

exports.default = Calendar;