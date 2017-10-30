import React from 'react';
import moment from 'moment';
import DatePicker from '../../src';

const DatePickerDefault = props => (
  <div className="field">

    <p>- 禁用组件: <code>disabled</code> </p>
    <DatePicker disabled />

    <p>- 禁用日期: <code>disabledDate</code></p>
    <DatePicker
      disabledDate={(date) => date.isAfter(moment())}
    />

    <p>- 禁用时间: <code>disabledHours</code>、<code>disabledMinutes</code>、<code>disabledSeconds</code></p>
    <DatePicker
      format="HH:mm:ss"
      ranges={[]}
      defaultValue={moment('2017-12-12 09:15:30')}
      disabledHours={hour => hour < 8 || hour > 18}
      disabledMinutes={minute => minute % 15 !== 0}
      disabledSeconds={second => second % 30 !== 0}
    />

    <p>- 隐藏时间: <code>hideHours</code>、<code>hideMinutes</code>、<code>hideSeconds</code></p>
    <DatePicker
      format="HH:mm:ss"
      ranges={[]}
      defaultValue={moment('2017-12-12 09:15:30')}
      hideHours={hour => hour < 8 || hour > 18}
      hideMinutes={minute => minute % 15 !== 0}
      hideSeconds={second => second % 30 !== 0}
    />
  </div>
);

export default DatePickerDefault;

