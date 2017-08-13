import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react/lib/ReactTestUtils';

import MonthView from '../src/Calendar/MonthView';

describe('MonthView', () => {

  it('Should render a div with "month-view" class', () => {

    const instance = ReactTestUtils.renderIntoDocument(
      <MonthView />
    );

    assert.equal(findDOMNode(instance).nodeName, 'DIV');
    assert.ok(findDOMNode(instance).className.match(/\bmonth-view\b/));
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <MonthView className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <MonthView style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });


});
