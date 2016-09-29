import React from 'react';
import TestUtils, {
    renderIntoDocument,
    findRenderedDOMComponentWithClass
} from 'react-addons-test-utils';
import MonthHeader from '../src/MonthHeader.js';
import { expect } from 'chai';

describe('MonthHeader', () => {
    let shallowRenderer = TestUtils.createRenderer();

    it('should render a div with "monthHeader" class', () => {
        shallowRenderer.render(
            <MonthHeader
            date={ new Date() }
                />
        );
        let result = shallowRenderer.getRenderOutput();
        expect(result.type).to.equal('div');
        expect(result.props.className).to.equal('monthHeader');
    });
});

