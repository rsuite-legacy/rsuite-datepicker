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
          dependencies={{
            moment,
            DatePicker
          }}
        >
          {require('./md/DatePickerDefault.md')}
        </CodeView>

        <CodeView
          dependencies={{
            moment,
            DatePicker
          }}
        >
          {require('./md/DatePickerDisabled.md')}
        </CodeView>

        <CodeView
          dependencies={{
            moment,
            DatePicker
          }}
        >
          {require('./md/DatePickerCustomToolbar.md')}
        </CodeView>


        <CodeView
          dependencies={{
            moment,
            DatePicker
          }}
        >
          {require('./md/DatePickerIntl.md')}
        </CodeView>

        <CodeView
          dependencies={{
            moment,
            DatePicker
          }}
        >
          {require('./md/DatePickerValue.md')}
        </CodeView>

        <CodeView
          dependencies={{
            Button,
            ButtonToolbar,
            moment,
            DatePicker
          }}
        >
          {require('./md/DatePickerToggle.md')}
        </CodeView>

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
