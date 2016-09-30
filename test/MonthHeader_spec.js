import React from 'react';
import {
    renderIntoDocument,
    findRenderedDOMComponentWithClass
} from 'react-addons-test-utils';
import MonthHeader from '../src/MonthHeader.js';
import { expect } from 'chai';
import { shallow } from './helpers.js';

describe('MonthHeader', () => {

    it('should render a div with "monthHeader" class', () => {
        let result = shallow(
            <MonthHeader
                date={ new Date() }
            />
        );
        expect(result.type).to.equal('div');
        expect(result.props.className).to.equal('monthHeader');
    });
});

