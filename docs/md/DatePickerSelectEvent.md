```js
import React from 'react';
import DatePicker from 'rsuite-datepicker';

const DatePickerSelectEvent = props => (
    <div className="field event">
        <DatePicker
            dateFormat="YYYY-MM-DD"
            onChange={ date => alert(date.toDateString()) }
        />
    </div>
);

export default DatePickerSelectEvent;
```
