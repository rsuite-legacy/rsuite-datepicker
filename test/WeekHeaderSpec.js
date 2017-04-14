import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react/lib/ReactTestUtils';

import WeekHeader from '../src/WeekHeader';

describe('WeekHeader', () => {

  it('should render a div with "weekHeader" class', () => {

    let instance = ReactTestUtils.renderIntoDocument(
      <WeekHeader />
    );

    assert.equal(findDOMNode(instance).nodeName, 'DIV');
    assert.ok(findDOMNode(instance).className.match(/\bweekHeader\b/));
  });

});
