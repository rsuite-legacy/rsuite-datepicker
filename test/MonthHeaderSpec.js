import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactTestUtils from 'react/lib/ReactTestUtils';

import MonthHeader from '../src/MonthHeader';


describe('MonthHeader', () => {

    it('should render a div with "monthHeader" class', () => {

        let instance = ReactTestUtils.renderIntoDocument(
            <MonthHeader
                date={new Date()}
            />
        );

        assert.equal(findDOMNode(instance).nodeName, 'DIV');
        assert.ok(findDOMNode(instance).className.match(/\bmonthHeader\b/));

    });
});

