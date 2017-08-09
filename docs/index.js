import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Markdown } from 'markdownloader';
import { Header, Navbar, Nav } from 'rsuite';


import './less/index.less';
import '../src/less/index.less';

import DatePickerOnlyDate from './example/DatePickerOnlyDate';
import DatePickerOnlyTime from './example/DatePickerOnlyTime';
import DatePickerWithTime from './example/DatePickerWithTime';
import DatePickerWithDefaultValue from './example/DatePickerWithDefaultValue';
import DatePickerInRange from './example/DatePickerInRange';
import DatePickerSelectEvent from './example/DatePickerSelectEvent';
import DatePickerIntl from './example/DatePickerIntl';

class App extends Component {
  render() {
    return (
      <div className="doc-page">
        <Header inverse>
          <div className="container">
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#"><span className="prefix">R</span>Suite  DatePicker</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav pullRight>
                <Nav.Item href="https://github.com/rsuite/rsuite-datepicker">GitHub</Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Header>

        <div className="container">
          <h3>DatePicker 日期选择框</h3>

          <h4>日期选择框</h4>
          <DatePickerOnlyDate />
          <Markdown>
            {require('./md/DatePickerOnlyDate.md')}
          </Markdown>

          <h4>时间选择框</h4>
          <DatePickerOnlyTime />
          <Markdown>
            {require('./md/DatePickerOnlyTime.md')}
          </Markdown>


          <h4>日期时间选择框</h4>
          <DatePickerWithTime />
          <Markdown>
            {require('./md/DatePickerWithTime.md')}
          </Markdown>

          <h4>设置初始值</h4>
          <DatePickerWithDefaultValue />
          <Markdown>
            {require('./md/DatePickerWithDefaultValue.md')}
          </Markdown>


          <h4>限制选择范围</h4>
          <DatePickerInRange />
          <Markdown>
            {require('./md/DatePickerInRange.md')}
          </Markdown>

          <h4>事件</h4>
          <DatePickerSelectEvent />
          <Markdown>
            {require('./md/DatePickerSelectEvent.md')}
          </Markdown>

          <h4>国际化</h4>
          <DatePickerIntl />
          <Markdown>
            {require('./md/DatePickerIntl.md')}
          </Markdown>

          <h4>属性</h4>
          <Markdown>
            {require('./md/props.md')}
          </Markdown>

        </div>

      </div>
    );
  }
}

ReactDOM.render(<App />,
  document.getElementById('app')
);
