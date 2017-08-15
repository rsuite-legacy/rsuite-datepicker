import React from 'react';
import moment from 'moment';
import DatePicker from '../../src';

const DatePickerIntl = props => (
  <div className="field only-date">
    <DatePicker
      format="YYYY-MM-DD HH:mm:ss"
      locale={{
        week: ['日', '一', '二', '三', '四', '五', '六'],
        ok: '确定',
        today: '今天',
        yesterday: '昨天',
        hours: '时',
        minutes: '分',
        seconds: '秒'
      }}
    />
  </div>
);

export default DatePickerIntl;

