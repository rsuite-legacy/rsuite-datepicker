import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import WeekHeader from '../src/Calendar/WeekHeader';

describe('WeekHeader', () => {

  it('Should render a div with "week-header" class', () => {

    const instance = ReactTestUtils.renderIntoDocument(
      <WeekHeader />
    );

    assert.equal(findDOMNode(instance).nodeName, 'DIV');
    assert.ok(findDOMNode(instance).className.match(/\bweek-header\b/));
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <WeekHeader className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <WeekHeader style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });


});
