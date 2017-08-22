import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import omit from 'lodash/omit';

const propTypes = {
  weekendDate: PropTypes.instanceOf(moment),
  selected: PropTypes.instanceOf(moment),
  onClick: PropTypes.func,
  disabledDate: PropTypes.func,
  inSameMonth: PropTypes.func
};

const defaultProps = {
  selected: moment()
};

class Week extends React.Component {

  renderDays() {
    const {
      weekendDate,
      disabledDate,
      inSameMonth,
      selected,
      onClick
     } = this.props;

    let days = [];
    for (let i = 0; i < 7; i += 1) {

      let thisDate = moment(weekendDate).add(i, 'd');
      let disabled = disabledDate && disabledDate(thisDate);
      let isToday = thisDate.isSame(moment(), 'date');
      let classes = classNames('week-day', {
        'un-same-month': !(inSameMonth && inSameMonth(thisDate)),
        'is-today': isToday,
        selected: thisDate.isSame(selected, 'date'),
        disabled
      });

      days.push(
        <div
          className={classes}
          role="menu"
          tabIndex="-1"
          title={isToday ? 'Today' : ''}
          onClick={!disabled && onClick && onClick.bind(null, thisDate)}
          key={i}
        >
          <span className="date-item">{thisDate.date()}</span>
        </div>
      );
    }
    return days;
  }

  render() {
    const {
      className,
      ...props
     } = this.props;

    const classes = classNames('week', className);
    const elementProps = omit(props, Object.keys(propTypes));

    return (
      <div
        {...elementProps}
        className={classes}
      >
        {this.renderDays()}
      </div>
    );
  }
}

Week.propTypes = propTypes;
Week.defaultProps = defaultProps;

export default Week;
