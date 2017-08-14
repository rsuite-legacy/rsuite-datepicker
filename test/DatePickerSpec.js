import React from 'react';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
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

  it('Should output a date', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DatePicker defaultValue={moment('2017-08-14')} />
    );
    assert.equal(findDOMNode(instance).querySelector('.rsuite-datepicker-toggle-placeholder').innerText, '2017-08-14');
  });

  it('Should output a date', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DatePicker value={moment('2017-08-14')} />
    );
    assert.equal(findDOMNode(instance).querySelector('.rsuite-datepicker-toggle-placeholder').innerText, '2017-08-14');
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

  it('Should call `onToggle` callback', (done) => {
    const doneOp = (show) => {
      if (show) {
        done();
      }
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <DatePicker onToggle={doneOp} />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelector('.rsuite-datepicker-toggle'));
  });

  it('Should call `onSelect` callback', (done) => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <DatePicker onSelect={doneOp} />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelector('.is-today'));
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
