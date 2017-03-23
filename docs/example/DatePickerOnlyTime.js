import React from 'react';

import DatePicker from '../../src';

const DatePickerOnlyTime = props => (
    <div className="field only-time">
        <DatePicker dateFormat="HH:mm:ss" />
    </div>
);

export default DatePickerOnlyTime;

