import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from '../src';
import '../style/Default.less';

const DatePickerOnlyDate = props => (
    <div className="field only-date">
        <DatePicker dateFormat="YYYY-MM-DD" />
    </div>
);

export default DatePickerOnlyDate;

