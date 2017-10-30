import React from 'react';
import moment from 'moment';
import DatePicker from '../../src';


const DatePickerCustomToolbar = props => (
  <div className="field">
    <DatePicker
      ranges={[{
        label: '昨天',
        value: moment().add(-1, 'd')
      }, {
        label: '今天',
        value: moment()
      }, {
        label: '前一天',
        unclosed: true,
        value: (datePage) => {
          return moment(datePage).add(-1, 'd');
        }
      }]}
    />
  </div>
);

export default DatePickerCustomToolbar;

