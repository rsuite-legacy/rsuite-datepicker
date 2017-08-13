import React from 'react';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import ReactTestUtils from 'react/lib/ReactTestUtils';

import MonthHeader from '../src/Calendar/MonthHeader';


describe('MonthHeader', () => {

  it('Should render a div with "calendar-header" class', () => {

    const instance = ReactTestUtils.renderIntoDocument(
      <MonthHeader
        date={moment()}
      />
    );
    const instanceDOM = findDOMNode(instance);

    assert.equal(instanceDOM.nodeName, 'DIV');
    assert.ok(instanceDOM.className.match(/\bcalendar-header\b/));
  });

  it('Should output a time for `HH:ss`', () => {

    const date = moment();
    const format = 'HH:ss';
    const instance = ReactTestUtils.renderIntoDocument(
      <MonthHeader
        showTime
        date={date}
        format={format}
      />
    );

    const instanceDOM = findDOMNode(instance);
    assert.equal(instanceDOM.querySelector('.title-time').innerText, date.format(format));
  });

  it('Should output a date for `YYYY-MM-DD`', () => {

    const date = moment();
    const format = 'YYYY-MM-DD';
    const instance = ReactTestUtils.renderIntoDocument(
      <MonthHeader
        showDate
        date={date}
        format={format}
      />
    );

    const instanceDOM = findDOMNode(instance);
    assert.equal(instanceDOM.querySelector('.title-date').innerText, date.format(format));
  });

  it('Should output a date for `YYYY-MM`', () => {

    const date = moment();
    const format = 'YYYY-MM';
    const instance = ReactTestUtils.renderIntoDocument(
      <MonthHeader
        showMonth
        date={date}
        format={format}
      />
    );

    const instanceDOM = findDOMNode(instance);
    assert.equal(instanceDOM.querySelector('.title-date').innerText, date.format(format));
  });

  it('Should call `onMoveForword` callback', (done) => {

    const doneOp = () => {
      done();
    };

    const date = moment();
    const format = 'YYYY-MM';
    const instance = ReactTestUtils.renderIntoDocument(
      <MonthHeader
        showMonth
        date={date}
        format={format}
        onMoveForword={doneOp}
      />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelector('.calendar-header-forward'));
  });

  it('Should call `onMoveBackward` callback', (done) => {

    const doneOp = () => {
      done();
    };

    const date = moment();
    const format = 'YYYY-MM';
    const instance = ReactTestUtils.renderIntoDocument(
      <MonthHeader
        showMonth
        date={date}
        format={format}
        onMoveBackward={doneOp}
      />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelector('.calendar-header-backward'));
  });

  it('Should call `onToggleMonthDropdown` callback', (done) => {

    const doneOp = () => {
      done();
    };

    const date = moment();
    const format = 'YYYY-MM';
    const instance = ReactTestUtils.renderIntoDocument(
      <MonthHeader
        showMonth
        date={date}
        format={format}
        onToggleMonthDropdown={doneOp}
      />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelector('.title-date'));
  });

  it('Should call `onToggleTimeDropdown` callback', (done) => {

    const doneOp = () => {
      done();
    };

    const date = moment();
    const format = 'HH:mm:ss';
    const instance = ReactTestUtils.renderIntoDocument(
      <MonthHeader
        showTime
        date={date}
        format={format}
        onToggleTimeDropdown={doneOp}
      />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelector('.title-time'));
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <MonthHeader className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <MonthHeader style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});

