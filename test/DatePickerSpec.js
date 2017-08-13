import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react/lib/ReactTestUtils';

import DatePicker from '../src/DatePicker';

describe('DatePicker', () => {

  it('Should render a div with "rsuite-datepicker" class', () => {

    const instance = ReactTestUtils.renderIntoDocument(
      <DatePicker />
    );

    assert.equal(findDOMNode(instance).nodeName, 'DIV');
    assert.ok(findDOMNode(instance).className.match(/\brsuite-datepicker\b/));
  });

  it('Should be disabled', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DatePicker disabled />
    );

    assert.ok(findDOMNode(instance).querySelector('.rsuite-datepicker-toggle').className.match(/\bdisabled\b/));
  });

  it('Should be inline', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DatePicker inline />
    );

    assert.ok(!findDOMNode(instance).querySelector('.rsuite-datepicker-toggle'));
  });

  it('Should call `onChange` callback', (done) => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <DatePicker onChange={doneOp} />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelector('.rsuite-datepicker-toolbar-right-btn-ok'));
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DatePicker className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });


  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <DatePicker style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });


});
