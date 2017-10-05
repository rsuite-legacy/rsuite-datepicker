import React from 'react';
import moment from 'moment';
import { Button, ButtonToolbar } from 'rsuite';
import DatePicker from '../../src';


class DatePickerToggle extends React.Component {
  render() {
    return (
      <div className="field">
        <ButtonToolbar style={{ marginBottom: 10 }}>
          <Button
            shape="default"
            onClick={() => {
              this.picker.show(true);
            }}
          >
            展开
          </Button>
          <Button
            shape="default"
            onClick={() => {
              this.picker.hide(true);
            }}
          >
            关闭
          </Button>
        </ButtonToolbar>

        <DatePicker
          ref={ref => this.picker = ref}
        />

      </div>
    );
  }
}

export default DatePickerToggle;

