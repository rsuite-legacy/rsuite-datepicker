import React from 'react';
import ReactDOM from 'react-dom';
import { Markdown } from 'react-markdown-reader';
import { Button, ButtonToolbar } from 'rsuite';

import moment from 'moment';
import { PageContainer } from 'rsuite-docs';

import './less/index.less';
import Examples from './Examples';
import DatePicker from '../src';

class App extends React.Component {
  render() {
    return (
      <PageContainer activeKey="DatePicker" githubURL="https://github.com/rsuite/rsuite-datepicker">
        <Markdown>{require('../README.md')}</Markdown>

        <h2>示例</h2>

        <Examples
          dependencies={{
            Button,
            ButtonToolbar,
            moment,
            DatePicker
          }}
          list={[
            require('./md/default.md'),
            require('./md/placement.md'),
            require('./md/intl.md'),
            require('./md/value.md'),
            require('./md/custom.md'),
            require('./md/disabled.md')
          ]}
        />

        <Markdown>{require('./md/props.md')}</Markdown>
      </PageContainer>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
/*
if (process.env.NODE_ENV !== 'production') {
  const { whyDidYouUpdate } = require('why-did-you-update');
  whyDidYouUpdate(React);
}
*/
