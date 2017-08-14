import React from 'react';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import ReactTestUtils from 'react/lib/ReactTestUtils';

import scrollTopAnimation from '../src/utils/scrollTopAnimation';

describe('scrollTopAnimation', () => {

  it('Should scroll top 100', (done) => {
    const instance = ReactTestUtils.renderIntoDocument(
      <div style={{ height: 100, width: 10, overflow: 'auto' }}>
        <div style={{ height: 1000, width: 10 }} />
      </div>
    );

    scrollTopAnimation(findDOMNode(instance), 100, true, (top) => {
      done();
    });
  });


});
