import React from 'react';
import PropTypes from 'prop-types';
import { clockPropTypes } from './clockPropTypes';
import {
  Digits,
  Sliders
} from './components/clock';

const Clock = ({
  onChange,
  time,
  ...props
}) => (
    <div className="clock">
      <Digits
        time={time}
      />
      <Sliders
        {...props}
        time={time}
        onChange={onChange}
      />
    </div>
  );

Clock.propTypes = {
  ...clockPropTypes,
  onChange: PropTypes.func,
  time: PropTypes.object,
  hourRange: PropTypes.array,
  hourStep: PropTypes.number,
  minuteStep: PropTypes.number,
  secondStep: PropTypes.number
};

export default Clock;
