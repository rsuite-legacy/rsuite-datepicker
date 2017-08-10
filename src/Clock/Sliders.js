import React from 'react';
import PropTypes from 'prop-types';
import Slider from './Slider';
import { clockPropTypes } from '../clockPropTypes';

const propTypes = {
  ...clockPropTypes,
  time: PropTypes.shape({
    hours: PropTypes.number,
    minutes: PropTypes.number,
    seconds: PropTypes.number
  }),
  onChange: PropTypes.func
};

const Sliders = ({
  time,
  onChange,
  hourStep,
  minuteStep,
  secondStep,
  hourRange,
  minuteRange,
  secondRange,
  ruler
}) => (
    <div className="sliders">
      {
        ['hours', 'minutes', 'seconds']
          .filter(k => time[k] !== undefined)
          .map(k => {
            switch (k) {
              case 'hours':
                return (
                  <Slider
                    range={hourRange}
                    value={time[k]}
                    key={k}
                    step={hourStep}
                    ruler={ruler}
                    onChange={
                      value => onChange({ ...time, hours: value })
                    }
                  />
                );
              case 'minutes':
                return (
                  <Slider
                    range={minuteRange}
                    value={time[k]}
                    key={k}
                    step={minuteStep}
                    ruler={ruler}
                    onChange={
                      value => onChange({ ...time, minutes: value })
                    }
                  />
                );
              case 'seconds':
                return (
                  <Slider
                    range={secondRange}
                    value={time[k]}
                    key={k}
                    step={secondStep}
                    ruler={ruler}
                    onChange={
                      value => onChange({ ...time, seconds: value })
                    }
                  />
                );
              default:
                return;
            }
          })
      }
    </div>
  );

Sliders.propTypes = propTypes;

export default Sliders;
