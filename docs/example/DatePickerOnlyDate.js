import React from 'react';
import DatePicker from '../../src';


const DatePickerOnlyDate = props => (
  <div className="field only-date">
    <DatePicker
      dateFormat="YYYY-MM-DD HH:mm:ss"
    />
  </div>
);

export default DatePickerOnlyDate;

