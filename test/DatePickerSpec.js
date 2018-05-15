import React from 'react';
import { findDOMNode } from 'react-dom';
import moment from 'moment';
import ReactTestUtils from 'react-dom/test-utils';
import sinon from 'sinon';

import { mount } from 'enzyme';

import DatePicker from '../src/DatePicker';

describe('DatePicker', () => {
  it('Should render a div with "rs-picker-date" class', () => {
    const instance = ReactTestUtils.renderIntoDocument(<DatePicker />);

    assert.equal(findDOMNode(instance).nodeName, 'DIV');
    assert.ok(findDOMNode(instance).className.match(/\brs-picker-date\b/));
  });

  it('Should be disabled', () => {
    const instance = ReactTestUtils.renderIntoDocument(<DatePicker disabled />);

    assert.ok(findDOMNode(instance).className.match(/\bdisabled\b/));
  });

  it('Should be not cleanable', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DatePicker cleanable={false} value={moment()} />
    );

    assert.ok(!findDOMNode(instance).querySelector('.rs-picker-toggle-clean'));
  });

  it('Should be inline', () => {
    const instance = ReactTestUtils.renderIntoDocument(<DatePicker inline />);

    assert.ok(!findDOMNode(instance).querySelector('.rs-picker-toggle'));
  });

  it('Should output a date', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <DatePicker defaultValue={moment('2017-08-14')} />
    );
    assert.equal(
      findDOMNode(instance).querySelector('.rs-picker-toggle-value').innerText,
      '2017-08-14'
    );
  });

  it('Should output a date', () => {
    const instance = ReactTestUtils.renderIntoDocument(<DatePicker value={moment('2017-08-14')} />);
    assert.equal(
      findDOMNode(instance).querySelector('.rs-picker-toggle-value').innerText,
      '2017-08-14'
    );
  });

  it('Should call `onChange` callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <DatePicker onChange={doneOp} defaultOpen />
    );
    const node = instance.menuContainer;

    ReactTestUtils.Simulate.click(node.querySelector('.rs-picker-toolbar-right-btn-ok'));
  });

  it('Should call `onSelect` callback', done => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <DatePicker onSelect={doneOp} defaultOpen />
    );
    const node = instance.menuContainer;
    ReactTestUtils.Simulate.click(node.querySelector('.rs-picker-calendar-table-cell-is-today'));
  });

  it('Should call `onOk` callback', done => {
    const doneOp = () => {
      done();
    };

    const instance = ReactTestUtils.renderIntoDocument(<DatePicker onOk={doneOp} defaultOpen />);
    const node = instance.menuContainer;
    ReactTestUtils.Simulate.click(node.querySelector('.rs-picker-toolbar-right-btn-ok'));
  });

  it('Should call `onNextMonth` callback', done => {
    const doneOp = () => {
      done();
    };

    const instance = ReactTestUtils.renderIntoDocument(
      <DatePicker onNextMonth={doneOp} defaultOpen />
    );
    const node = instance.menuContainer;
    ReactTestUtils.Simulate.click(node.querySelector('.rs-picker-calendar-header-forward'));
  });

  it('Should call `onPrevMonth` callback', done => {
    const doneOp = () => {
      done();
    };

    const instance = ReactTestUtils.renderIntoDocument(
      <DatePicker onPrevMonth={doneOp} defaultOpen />
    );
    const node = instance.menuContainer;
    ReactTestUtils.Simulate.click(node.querySelector('.rs-picker-calendar-header-backward'));
  });

  it('Should call `onToggleMonthDropdown` callback', done => {
    const doneOp = () => {
      done();
    };

    const instance = ReactTestUtils.renderIntoDocument(
      <DatePicker onToggleMonthDropdown={doneOp} inline format="YYYY-MM-DD HH:mm:ss" />
    );
    ReactTestUtils.Simulate.click(
      findDOMNode(instance).querySelector('.rs-picker-calendar-header-title')
    );
  });

  it('Should call `onToggleTimeDropdown` callback', done => {
    const doneOp = () => {
      done();
    };

    const instance = ReactTestUtils.renderIntoDocument(
      <DatePicker onToggleTimeDropdown={doneOp} inline format="YYYY-MM-DD HH:mm:ss" />
    );
    ReactTestUtils.Simulate.click(
      findDOMNode(instance).querySelector('.rs-picker-calendar-header-title-time')
    );
  });

  it('Should be update pageDate', () => {
    class Demo extends React.Component {
      render() {
        return <DatePicker inline value={moment('2018-04-01')} {...this.props} />;
      }
    }

    const wrapper = mount(<Demo inline />);

    expect(wrapper.find('.rs-picker-calendar-table-cell-selected').text()).to.equal('1');
    wrapper.setProps({
      value: moment('2018-04-11')
    });
    expect(wrapper.find('.rs-picker-calendar-table-cell-selected').text()).to.equal('11');
  });

  it('Should have a custom className', () => {
    const instance = ReactTestUtils.renderIntoDocument(<DatePicker className="custom" />);
    assert.ok(findDOMNode(instance).className.match(/\bcustom\b/));
  });

  it('Should have a custom style', () => {
    const fontSize = '12px';
    const instance = ReactTestUtils.renderIntoDocument(<DatePicker style={{ fontSize }} />);
    assert.equal(findDOMNode(instance).style.fontSize, fontSize);
  });

  it('Should be a complete life cycle', () => {
    const willMount = sinon.spy();
    const didMount = sinon.spy();
    const willUnmount = sinon.spy();
    const diduMount = sinon.spy();

    class Foo extends React.Component {
      constructor(props) {
        super(props);
        this.componentWillUnmount = willUnmount;
        this.componentWillMount = willMount;
        this.componentDidMount = didMount;
        this.componentDidUpdate = diduMount;
      }
      render() {
        return <DatePicker {...this.props} />;
      }
    }
    const wrapper = mount(<Foo />);
    expect(willMount.callCount).to.equal(1);
    expect(didMount.callCount).to.equal(1);
    expect(willUnmount.callCount).to.equal(0);

    wrapper.setProps({
      calendarDefaultDate: moment('2012-01-01'),
      value: moment('2012-01-01')
    });

    expect(diduMount.callCount).to.equal(1);

    wrapper.unmount();
    expect(willUnmount.callCount).to.equal(1);
  });

  it('Should call `onChangeCalendarDate` callback when click backward', done => {
    const doneOp = () => {
      done();
    };

    const instance = ReactTestUtils.renderIntoDocument(
      <DatePicker onChangeCalendarDate={doneOp} defaultOpen />
    );
    const node = instance.menuContainer;
    ReactTestUtils.Simulate.click(node.querySelector('.rs-picker-calendar-header-backward'));
  });

  it('Should call `onChangeCalendarDate` callback when click backward', done => {
    const doneOp = () => {
      done();
    };

    const instance = ReactTestUtils.renderIntoDocument(
      <DatePicker onChangeCalendarDate={doneOp} defaultOpen />
    );
    const node = instance.menuContainer;
    ReactTestUtils.Simulate.click(node.querySelector('.rs-picker-calendar-header-backward'));
  });

  it('Should call `onChangeCalendarDate` callback when click forward', done => {
    const doneOp = () => {
      done();
    };

    const instance = ReactTestUtils.renderIntoDocument(
      <DatePicker onChangeCalendarDate={doneOp} defaultOpen />
    );
    const node = instance.menuContainer;
    ReactTestUtils.Simulate.click(node.querySelector('.rs-picker-calendar-header-forward'));
  });

  it('Should call `onChangeCalendarDate` callback when click today ', done => {
    const doneOp = () => {
      done();
    };
    const instance = ReactTestUtils.renderIntoDocument(
      <DatePicker onChangeCalendarDate={doneOp} defaultOpen />
    );
    const node = instance.menuContainer;
    ReactTestUtils.Simulate.click(node.querySelector('.rs-picker-calendar-table-cell-is-today'));
  });
});
