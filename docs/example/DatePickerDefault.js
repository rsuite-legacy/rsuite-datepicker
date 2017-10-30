import React from 'react';
import moment from 'moment';
import DatePicker from '../../src';

const DatePickerDefault = props => (
  <div className="field">
    <p>- 显示日历面板: <br /><code>{'<DatePicker format="YYYY-MM-DD HH:mm:ss" inline />'}</code></p>
    <DatePicker format="YYYY-MM-DD HH:mm:ss" inline />
    <p>- 显示日期与时间: <br /><code>{'<DatePicker format="YYYY-MM-DD HH:mm:ss" />'}</code></p>
    <DatePicker format="YYYY-MM-DD HH:mm:ss" />
    <p>- 显示日期: <br /><code>{'<DatePicker format="YYYY-MM-DD" />'}</code></p>
    <DatePicker format="YYYY-MM-DD" />
    <p>- 显示月份: <br /><code>{'<DatePicker format="YYYY-MM" ranges={[]} />'}</code></p>
    <DatePicker format="YYYY-MM" ranges={[]} />
    <p>- 显示时间: <br /><code>{'<DatePicker format="HH:mm:ss" ranges={[]} />'}</code></p>
    <DatePicker format="HH:mm:ss" ranges={[]} />
    <p>- 只显示小时与分钟: <br /><code>{'<DatePicker format="HH:mm" ranges={[]} />'}</code></p>
    <DatePicker format="HH:mm" ranges={[]} />
    <p>- 设置 placeholder: <br /><code>{'<DatePicker placeholder="请选择日期" />'}</code></p>
    <DatePicker placeholder="请选择日期" />
    <p>- 设置默认值: <br /><code>{'<DatePicker defaultValue={moment()} />'}</code></p>
    <DatePicker defaultValue={moment()} />
    <p>- 设置日历面板默认时间: <br /> <code>{'<DatePicker format="YYYY-MM-DD HH:mm:ss" calendarDefaultDate={moment("2012-10-01 12:00:00")} />'}</code></p>
    <DatePicker format="YYYY-MM-DD HH:mm:ss" calendarDefaultDate={moment('2012-10-01 12:00:00')} />
  </div>
);

export default DatePickerDefault;

