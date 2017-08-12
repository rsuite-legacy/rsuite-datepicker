import React from 'react';
import PropTypes from 'prop-types';
import { getPosition, scrollTop } from 'dom-lib';
import moment from 'moment';
import _ from 'lodash';
import classNames from 'classnames';
import calendarPropTypes from '../calendarPropTypes';
import scrollTopAnimation from '../utils/scrollTopAnimation';
import decorate from '../utils/decorate';

const propTypes = {
  ..._.omit(calendarPropTypes, 'disabledDate'),
  date: PropTypes.instanceOf(moment),
  onClick: PropTypes.func,
  show: PropTypes.bool,
  time: PropTypes.shape({
    hours: PropTypes.number,
    minutes: PropTypes.number,
    seconds: PropTypes.number
  })
};

const ranges = {
  hours: { start: 0, end: 23 },
  minutes: { start: 0, end: 59 },
  seconds: { start: 0, end: 59 },
};


class TimeDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.container = {};
  }

  componentDidMount() {
    this.updatePosition();
  }

  componentWillReceiveProps(nextProps) {
    this.updatePosition(nextProps);
  }

  updatePosition(props) {
    const { time, show } = props || this.props;
    time && show && this.scrollTo(time);
  }

  scrollTo = (time) => {

    Object.entries(time).forEach((item) => {
      let container = this.container[item[0]];
      let node = container.querySelector(`.item-${item[0]}-${item[1]}`);
      if (node && container) {
        let { top } = getPosition(node, container);
        scrollTopAnimation(this.container[item[0]], top, scrollTop(this.container[item[0]]) !== 0);
      }
    });
  }

  handleClick = (type, d, event) => {
    const { onClick, date } = this.props;
    const nextDate = moment(date)[type](d);
    onClick && onClick(nextDate, event);
  }

  renderColumn(type, active) {

    if (!_.isNumber(active)) {
      return null;
    }

    const { start, end } = ranges[type];
    const items = [];

    const hide = this.props[_.camelCase(`hide_${type}`)];
    const disabled = this.props[_.camelCase(`disabled_${type}`)];

    for (let i = start; i <= end; i += 1) {

      if (!(hide && hide(i))) {
        let itemClasses = classNames({
          active: active === i,
          disabled: (disabled && disabled(i))
        }, `item-${type}-${i}`);

        items.push(
          <li key={i}>
            <a
              role="menu"
              className={itemClasses}
              tabIndex="-1"
              onClick={(event) => {
                this.handleClick(type, i, event);
              }}
            >
              {i}
            </a>
          </li>
        );
      }
    }

    return (
      <div className="column">
        <ul
          ref={(ref) => {
            this.container[type] = ref;
          }}
        >
          {items}
        </ul>
      </div>
    );
  }

  render() {

    const { time, defaultClassName } = this.props;

    return (
      <div className={defaultClassName}>
        <div
          className={this.prefix('content')}
          ref={(ref) => {
            this.content = ref;
          }}
        >
          <div className={this.prefix('content-row')}>
            {this.renderColumn('hours', time.hours)}
            {this.renderColumn('minutes', time.minutes)}
            {this.renderColumn('seconds', time.seconds)}
          </div>
        </div>
      </div>
    );
  }
}

TimeDropdown.propTypes = propTypes;

export default decorate({
  prefixClass: 'time-dropdown'
})(TimeDropdown);
