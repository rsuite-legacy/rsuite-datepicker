import React from 'react';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import ReactTestUtils from 'react/lib/ReactTestUtils';

import MonthDropdown from '../src/Calendar/MonthDropdown';

describe('MonthDropdown', () => {

  it('Should output year and month ', () => {

    const date = moment();
    const size = (date.year() - 1950) + 6;
    const instance = ReactTestUtils.renderIntoDocument(
      <MonthDropdown date={date} />
    );

    const instanceDOM = findDOMNode(instance);
    assert.equal(instanceDOM.querySelectorAll('.month-dropdown-year-title').length, size);
    assert.equal(instanceDOM.querySelectorAll('.month-dropdown-month-cell').length, size * 12);
  });

  it('Should call `onClick` callback ', (done) => {

    const date = moment();
    const doneOp = () => {
      done();
    };

    const instance = ReactTestUtils.renderIntoDocument(
      <MonthDropdown date={date} onClick={doneOp} />
    );

    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelector('.month-dropdown-month-cell'));
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <MonthDropdown className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <MonthDropdown style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });


});
