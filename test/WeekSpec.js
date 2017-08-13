import React from 'react';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import ReactTestUtils from 'react/lib/ReactTestUtils';

import Week from '../src/Calendar/Week';

describe('Week', () => {

  it('Should render a div with `week` class', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Week />
    );
    assert.equal(findDOMNode(instance).nodeName, 'DIV');
    assert.ok(findDOMNode(instance).className.match(/\bweek\b/));
  });


  it('Should be active today', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Week />
    );
    const instanceDOM = findDOMNode(instance);


    assert.equal(instanceDOM.querySelector('.is-today').innerText, moment().date() + '');
  });

  it('Should call `onClick` callback', (done) => {

    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <Week onClick={doneOp} />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelector('.week-day'));
  });


  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Week className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <Week style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });


});
