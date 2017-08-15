import React from 'react';
import moment from 'moment';
import { Button, ButtonToolbar } from 'rsuite';
import DatePicker from '../../src';


class DatePickerToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false
    };
  }
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
          toggle={this.state.toggle}
        />

      </div>
    );
  }
}

export default DatePickerToggle;

