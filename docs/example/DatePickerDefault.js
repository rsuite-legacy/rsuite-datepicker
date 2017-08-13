import React from 'react';
import moment from 'moment';
import DatePicker from '../../src';

const DatePickerDefault = props => (
  <div className="field">
    <DatePicker format="YYYY-MM-DD HH:mm:ss" inline />
    <DatePicker format="YYYY-MM-DD HH:mm:ss" />
    <DatePicker format="YYYY-MM-DD" />
    <DatePicker format="YYYY-MM" ranges={[]} />
    <DatePicker format="HH:mm:ss" ranges={[]} />
    <DatePicker format="HH:mm" ranges={[]} />
    <DatePicker placeholder="请选择日期" />
    <DatePicker defaultValue={moment()} />
  </div>
);

export default DatePickerDefault;

