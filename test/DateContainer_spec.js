import React from 'react';
import { expect } from 'chai';
import DateContainer from '../src/DateContainer.js';
import { shallow } from './helpers.js';

describe('DateContainer', () => {

    it('should render a div with "dateContainer" class', () => {
        let result = shallow(
            <DateContainer />
        );
        expect(result.type).to.equal('div');
        expect(result.props.className).to.equal('dateContainer');
    });

    it('should render placeholder string', () => {
        let result = shallow(
            <DateContainer placeholder="Placeholder Text" />
        );
        expect(result.props.children[0].props.children).to.equal('Placeholder Text');
    });

});

