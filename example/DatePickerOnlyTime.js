import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from '../src';
import '../style/Default.less';

const DatePickerOnlyTime = props => (
    <div className="field only-time">
        <DatePicker dateFormat="HH:mm:ss" />
    </div>
);

export default DatePickerOnlyTime;

