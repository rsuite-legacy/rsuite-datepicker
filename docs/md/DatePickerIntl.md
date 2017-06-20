```js
import React from 'react';
import DatePicker from 'rsuite-datepicker';

const DatePickerIntl = props => (
  <div className="field only-date">
    <DatePicker
      dateFormat="YYYY-MM-DD"
      locale={{
        week: ['日', '一', '二', '三', '四', '五', '六']
      }}
    />
  </div>
);

export default DatePickerIntl;

```
