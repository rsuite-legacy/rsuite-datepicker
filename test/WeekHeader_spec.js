import React from 'react';
import { createRenderer } from 'react-addons-test-utils';
import WeekHeader from '../src/WeekHeader.js';
import { expect } from 'chai';
import { shallow } from './helpers.js';

describe('WeekHeader', () => {

    let result = shallow(
        <WeekHeader />
    );

    it('should render a div with "weekHeader" class', () => {
        expect(result.type).to.equal('div');
        expect(result.props.className).to.equal('weekHeader');
    });

});
