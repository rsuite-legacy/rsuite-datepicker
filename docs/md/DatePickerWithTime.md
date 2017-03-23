```js
import React from 'react';
import DatePicker from 'rsuite-datepicker';

const DatePickerWithTime = props => (
    <div className="field">
        <DatePicker
            autoClose={false}
            dateFormat="YYYY-MM-DD HH:mm:ss"
        />
    </div>
);

export default DatePickerWithTime;
```

