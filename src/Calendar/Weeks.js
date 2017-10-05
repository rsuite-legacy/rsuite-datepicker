import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import omit from 'lodash/omit';
import Week from './Week';


const propTypes = {
  /* eslint-disable */
  weeks: PropTypes.array,
  selected: PropTypes.instanceOf(moment),
  onSelect: PropTypes.func,
  disabledDate: PropTypes.func,
  inSameMonth: PropTypes.func
};

const defaultProps = {
  weeks: []
};

class Weeks extends React.Component {
  render() {
    const {
      weeks,
      selected,
      onSelect,
      disabledDate,
      inSameMonth,
      className,
      ...props
    } = this.props;

    const classes = classNames('weeks', className);
    const elementProps = omit(props, Object.keys(propTypes));

    return (
      <div
        {...elementProps}
        className={classes}
      >
        {
          weeks.map((week, index) => (
            <Week
              /* eslint-disable */
              key={index}
              weekendDate={week}
              selected={selected}
              onSelect={onSelect}
              inSameMonth={inSameMonth}
              disabledDate={disabledDate}
            />
          ))
        }
      </div>
    );
  }
}

Weeks.propTypes = propTypes;
Weeks.defaultProps = defaultProps;

export default Weeks;
