import React from 'react';
import DatePicker from '../../src';

const DatePickerWithTime = props => (
    <div className="field">
        <DatePicker
            autoClose={false}
            dateFormat="YYYY-MM-DD HH:mm:ss"
        />
    </div>
);

export default DatePickerWithTime;

