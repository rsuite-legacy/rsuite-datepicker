import React from 'react';
import DatePicker from '../../src';

const DatePickerInRange = props => (
    <div className="field in-range">
        <DatePicker
            dateFormat="YYYY-MM-DD"
            minDate={new Date(2016, 8 - 1, 1)}
            maxDate={new Date(2017, 1 - 1, 30)}
        />
    </div>
);

export default DatePickerInRange;

