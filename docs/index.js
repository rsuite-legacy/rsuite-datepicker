import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Markdown } from 'react-markdown-reader';
import { Button, ButtonToolbar } from 'rsuite';

import CodeView from 'react-code-view';
import moment from 'moment';
import { PageContainer } from 'rsuite-docs';

import './less/index.less';

import DatePicker from '../src';

class App extends Component {
  render() {
    return (
      <PageContainer
        githubURL="https://github.com/rsuite/rsuite-datepicker"
        activeKey="DatePicker"
      >

        <Markdown>
          {require('../README.md')}
        </Markdown>

        <h2>示例</h2>

        <CodeView
          source={require('./md/DatePickerDefault.md')}
          dependencies={{
            moment,
            DatePicker
          }}
        />

        <CodeView
          source={require('./md/DatePickerDisabled.md')}
          dependencies={{
            moment,
            DatePicker
          }}
        />

        <CodeView
          source={require('./md/DatePickerCustomToolbar.md')}
          dependencies={{
            moment,
            DatePicker
          }}
        />


        <CodeView
          source={require('./md/DatePickerIntl.md')}
          dependencies={{
            moment,
            DatePicker
          }}
        />

        <CodeView
          source={require('./md/DatePickerValue.md')}
          dependencies={{
            moment,
            DatePicker
          }}
        />

        <CodeView
          source={require('./md/DatePickerToggle.md')}
          dependencies={{
            Button,
            ButtonToolbar,
            moment,
            DatePicker
          }}
        />

        <Markdown>
          {require('./md/props.md')}
        </Markdown>

      </PageContainer>
    );
  }
}

ReactDOM.render(<App />,
  document.getElementById('app')
);
