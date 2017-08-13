import React from 'react';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import ReactTestUtils from 'react/lib/ReactTestUtils';

import DateContainer from '../src/DateContainer';


describe('DateContainer', () => {


  it('Should render a div with "dateContainer" class', () => {

    const instance = ReactTestUtils.renderIntoDocument(
      <DateContainer />
    );

    const instanceDOM = findDOMNode(instance);
    assert.equal(instanceDOM.nodeName, 'DIV');
    assert.ok(instanceDOM.className.match(/\brsuite-datepicker-toggle\b/));

  });

  it('Should render placeholder string', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DateContainer placeholder="Placeholder Text" />
    );
    const instanceDOM = findDOMNode(instance);
    assert.equal(instanceDOM.querySelector('.rsuite-datepicker-toggle-placeholder').innerText, 'Placeholder Text');
  });

  it('Should be disabled', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DateContainer disabled />
    );
    const instanceDOM = findDOMNode(instance);
    assert.ok(instanceDOM.className.match(/\bdisabled\b/));
  });

  it('Should render a clean button', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DateContainer showCleanButton />
    );
    const instanceDOM = findDOMNode(instance);
    assert.ok(instanceDOM.querySelector('.rsuite-datepicker-toggle-clean'));
  });

  it('Should render a custom placeholder', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DateContainer
        placeholder="2017-08-13"
        renderPlaceholder={(placeholder) => {
          return <i>{placeholder}</i>;
        }}
      />
    );
    const instanceDOM = findDOMNode(instance);
    assert.equal(instanceDOM.querySelector('i').innerText, '2017-08-13');
  });

  it('Should call onClick callback', (done) => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <DateContainer
        onClick={doneOp}
      />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM);
  });

  it('Should call onClean callback', (done) => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <DateContainer
        showCleanButton
        onClean={doneOp}
      />
    );
    const instanceDOM = findDOMNode(instance);
    ReactTestUtils.Simulate.click(instanceDOM.querySelector('.rsuite-datepicker-toggle-clean'));
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DateContainer className="custom" />
    );
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(
      <DateContainer style={{ fontSize }} />
    );
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

});
