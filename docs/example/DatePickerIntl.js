import React from 'react';
import moment from 'moment';
import DatePicker from '../../src';

const DatePickerIntl = props => (
  <div className="field only-date">
    <DatePicker
      locale={{
        week: ['日', '一', '二', '三', '四', '五', '六'],
        ok: '确定'
      }}
      ranges={[{
        label: '今天',
        value: moment()
      }]}
    />
  </div>
);

export default DatePickerIntl;

