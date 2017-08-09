import React from 'react';
import PropTypes from 'prop-types';
import {
  Digits,
  Sliders
} from './components/clock';

const Clock = ({
  onChange,
  time
}) => (
    <div className="clock">
      <Digits
        time={time}
      />
      <Sliders
        time={time}
        onChange={onChange}
      />
    </div>
  );

Clock.propTypes = {
  onChange: PropTypes.func,
  time: PropTypes.object
};

export default Clock;
