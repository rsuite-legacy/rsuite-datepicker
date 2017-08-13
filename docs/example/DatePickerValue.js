import React from 'react';
import DatePicker from '../../src';
import moment from 'moment';

class DatePickerValue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: moment()
    };
  }
  render() {
    return (
      <div className="field">
        <DatePicker defaultValue={moment()} />
        <DatePicker
          value={this.state.value}
          onChange={(value) => {
            this.setState({ value });
          }}
        />
      </div>
    );
  }
}

export default DatePickerValue;

