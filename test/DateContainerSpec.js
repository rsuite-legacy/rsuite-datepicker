import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react/lib/ReactTestUtils';

import DateContainer from '../src/DateContainer';


describe('DateContainer', () => {


  it('should render a div with "dateContainer" class', () => {

    let instance = ReactTestUtils.renderIntoDocument(
      <DateContainer />
    );


    assert.equal(findDOMNode(instance).nodeName, 'DIV');
    assert.ok(findDOMNode(instance).className.match(/\bdateContainer\b/));

  });

  it('should render placeholder string', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <DateContainer placeholder="Placeholder Text" />
    );
    assert.equal(findDOMNode(instance).querySelector('.dateContainer-placeholder').innerText, 'Placeholder Text');
  });
});

