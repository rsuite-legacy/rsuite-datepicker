'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _reactDom = require('react-dom');

var _DateContainer = require('./DateContainer.js');

var _DateContainer2 = _interopRequireDefault(_DateContainer);

var _Calendar = require('./Calendar.js');

var _Calendar2 = _interopRequireDefault(_Calendar);

var _eventDetect = require('./utils/eventDetect.js');

var _RootCloseWrapper = require('rsuite/lib/fixtures/RootCloseWrapper.js');

var _RootCloseWrapper2 = _interopRequireDefault(_RootCloseWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DatePicker = _react2.default.createClass({
    displayName: 'DatePicker',

    propTypes: {
        selected: _react.PropTypes.instanceOf(Date),
        minDate: _react.PropTypes.instanceOf(Date),
        maxDate: _react.PropTypes.instanceOf(Date),
        format: _react.PropTypes.string,
        onSelect: _react.PropTypes.func
    },

    contextTypes: {
        formGroup: _react2.default.PropTypes.object
    },

    getFormGroup: function getFormGroup() {
        return this.context.formGroup || {};
    },
    getValue: function getValue() {
        var _getFormGroup = this.getFormGroup();

        var value = _getFormGroup.value;


        if (value && !/Invalid|NaN/.test(new Date(value))) {
            return new Date(value);
        }
        return this.state.selected || undefined;
    },
    getDefaultProps: function getDefaultProps() {
        return {
            format: 'YYYY-MM-DD'
        };
    },
    getInitialState: function getInitialState() {
        var selected = this.props.selected;

        var ret = (0, _eventDetect.transitionEndDetect)();
        return {
            selected: selected,
            pageDate: selected ? new Date(selected.getFullYear(), selected.getMonth()) : this.getDefaultPageDate(),
            calendarState: 'HIDE',
            transitionSupport: ret
        };
    },
    reset: function reset() {
        this.setState({
            selected: null,
            pageDate: this.getDefaultPageDate(),
            calendarState: 'HIDE'
        });

        var _getFormGroup2 = this.getFormGroup();

        var onChange = _getFormGroup2.onChange;

        onChange && onChange(null);
    },
    getDefaultPageDate: function getDefaultPageDate() {
        var _props = this.props;
        var minDate = _props.minDate;
        var maxDate = _props.maxDate;

        var retDate = new Date();
        if (minDate && retDate.getTime() < minDate.getTime()) retDate = minDate;
        if (maxDate && retDate.getTime() > maxDate.getTime()) retDate = maxDate;
        return retDate;
    },
    getDateString: function getDateString() {
        var selected = this.getValue();
        return selected ? (0, _moment2.default)(selected).format(this.props.format) : '';
    },
    resetPageDate: function resetPageDate() {
        var selected = this.getValue() || this.getDefaultPageDate();
        var pageDate = new Date(selected.getFullYear(), selected.getMonth());
        this.setState({ pageDate: pageDate });
    },
    show: function show() {
        this.resetPageDate();
        this.setState({ calendarState: 'SHOW' });
    },
    hide: function hide() {
        this.setState({ calendarState: 'HIDE' });
    },
    toggle: function toggle() {
        var calendarState = this.state.calendarState;

        if (calendarState === 'SHOW') this.hide();
        if (calendarState === 'HIDE') this.show();
        if (calendarState === 'EDITING') this.hide();
    },
    showEditPanel: function showEditPanel() {
        this.setState({ calendarState: 'EDITING' });
    },
    hideEditPanel: function hideEditPanel() {
        this.setState({ calendarState: 'SHOW' });
    },
    toggleEditPanel: function toggleEditPanel() {
        var calendarState = this.state.calendarState;

        if (calendarState === 'EDITING') this.hideEditPanel();
        if (calendarState === 'SHOW') this.showEditPanel();
    },
    onMoveForword: function onMoveForword(nextPageDate) {
        var transitionSupport = this.state.transitionSupport;

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
    onMoveBackward: function onMoveBackward(nextPageDate) {
        var transitionSupport = this.state.transitionSupport;

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
    onMoveDone: function onMoveDone() {
        var _state = this.state;
        var calendarState = _state.calendarState;
        var pageDate = _state.pageDate;

        var pageChanges = 0;
        if (calendarState === 'SLIDING_L') pageChanges = 1;
        if (calendarState === 'SLIDING_R') pageChanges = -1;
        var nextPageDate = new Date(pageDate.getFullYear(), pageDate.getMonth() + pageChanges);
        this.setState({
            pageDate: nextPageDate,
            calendarState: 'SHOW'
        });
    },
    onChangePageDate: function onChangePageDate(nextPageDate) {
        this.setState({
            pageDate: nextPageDate,
            calendarState: 'SHOW'
        });
    },
    setMinDate: function setMinDate(date) {
        this.setState({ minDate: date });
    },
    setMaxDate: function setMaxDate(date) {
        this.setState({ maxDate: date });
    },
    onSelect: function onSelect(day) {
        var onSelect = this.props.onSelect;

        var _getFormGroup3 = this.getFormGroup();

        var onChange = _getFormGroup3.onChange;

        this.hide();
        this.setState({ selected: day });
        onSelect && onSelect(day);
        onChange && onChange(day);
    },
    componentDidMount: function componentDidMount() {
        var _this = this;

        var yearScrollAmount = 0;
        var monthScrollAmount = 0;

        var transitionSupport = this.state.transitionSupport;

        var el = (0, _reactDom.findDOMNode)(this.refs.calendar);
        if (transitionSupport.supported) {
            el.addEventListener(transitionSupport.event, function (e) {
                if (e.target.className === 'monthView-weeksWrapper' && e.propertyName === 'left') {
                    _this.onMoveDone();
                }
            });
        }
    },
    render: function render() {
        var _props2 = this.props;
        var minDate = _props2.minDate;
        var maxDate = _props2.maxDate;
        var _state2 = this.state;
        var calendarState = _state2.calendarState;
        var pageDate = _state2.pageDate;


        var selected = this.getValue();

        return _react2.default.createElement(
            _RootCloseWrapper2.default,
            { onRootClose: this.hide },
            _react2.default.createElement(
                'div',
                { className: 'DatePicker' },
                _react2.default.createElement(_DateContainer2.default, {
                    placeholder: this.getDateString(),
                    onClick: this.toggle,
                    onClean: selected && this.reset
                }),
                _react2.default.createElement(_Calendar2.default, {
                    calendarState: calendarState,
                    selectedDate: selected,
                    pageDate: pageDate,
                    minDate: minDate,
                    maxDate: maxDate,
                    onMoveForword: this.onMoveForword,
                    onMoveBackward: this.onMoveBackward,
                    onSelect: this.onSelect,
                    onClickTitle: this.toggleEditPanel,
                    onChangePageDate: this.onChangePageDate,
                    ref: 'calendar'
                })
            )
        );
    }
});

exports.default = DatePicker;