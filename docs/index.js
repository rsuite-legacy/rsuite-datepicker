import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Markdown } from 'markdownloader';
import { Header, Navbar, Nav, Row, Col } from 'rsuite';
import Affix from 'rsuite-affix';


import './less/index.less';
import DatePickerDefault from './example/DatePickerDefault';
import DatePickerDisabled from './example/DatePickerDisabled';
import DatePickerCustomToolbar from './example/DatePickerCustomToolbar';
import DatePickerIntl from './example/DatePickerIntl';
import DatePickerValue from './example/DatePickerValue';

class App extends Component {
  render() {
    return (
      <div className="doc-page">
        <Header inverse>
          <div className="container">
            <Navbar.Header>
              <Navbar.Brand>
                <a href="#">RSUITE DatePicker</a>
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
          <Row>
            <Col md={2} xsHidden smHidden>
              <Affix offsetTop={70}>
                <Nav className="sidebar">
                  <Nav.Item href="#readme">概述</Nav.Item>
                  <Nav.Item href="#default">示例</Nav.Item>
                  <Nav.Item href="#default">&nbsp;&nbsp;- 默认</Nav.Item>
                  <Nav.Item href="#disabled">&nbsp;&nbsp;- 禁用与隐藏</Nav.Item>
                  <Nav.Item href="#custom-toolbar">&nbsp;&nbsp;- 自定义快捷项</Nav.Item>
                  <Nav.Item href="#locale">&nbsp;&nbsp;- 本地化</Nav.Item>
                  <Nav.Item href="#controlled">&nbsp;&nbsp;- 非受控与受控</Nav.Item>
                  <Nav.Item href="#api">API</Nav.Item>
                </Nav>
              </Affix>
            </Col>
            <Col md={10}>
              <hr id="readme" className="target-fix" />
              <Markdown>
                {require('../README.md')}
              </Markdown>

              <hr id="default" className="target-fix" />
              <h2>示例</h2>
              <h3>默认</h3>
              <DatePickerDefault />
              <Markdown>
                {require('./md/DatePickerDefault.md')}
              </Markdown>

              <hr id="disabled" className="target-fix" />
              <h3>禁用与隐藏</h3>
              <DatePickerDisabled />
              <Markdown>
                {require('./md/DatePickerDisabled.md')}
              </Markdown>

              <hr id="custom-toolbar" className="target-fix" />
              <h3>自定义快捷项</h3>
              <DatePickerCustomToolbar />
              <Markdown>
                {require('./md/DatePickerCustomToolbar.md')}
              </Markdown>

              <hr id="locale" className="target-fix" />
              <h3>本地化</h3>
              <DatePickerIntl />
              <Markdown>
                {require('./md/DatePickerIntl.md')}
              </Markdown>

              <hr id="controlled" className="target-fix" />
              <h3>非受控与受控</h3>
              <DatePickerValue />
              <Markdown>
                {require('./md/DatePickerValue.md')}
              </Markdown>

              <hr id="api" className="target-fix" />
              <h3>属性</h3>
              <Markdown>
                {require('./md/props.md')}
              </Markdown>

            </Col>
          </Row>

        </div>

      </div>
    );
  }
}

ReactDOM.render(<App />,
  document.getElementById('app')
);
