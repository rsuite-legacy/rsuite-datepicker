import React from 'react';
import PropTypes from 'prop-types';
import Slider from './Slider';

const propTypes = {
  time: PropTypes.shape({
    hours: PropTypes.number,
    minutes: PropTypes.number,
    seconds: PropTypes.number
  }),
  onChange: PropTypes.func
};

const Sliders = ({ time, onChange }) => (
  <div className="sliders">
    {
      ['hours', 'minutes', 'seconds']
        .filter(k => time[k] !== undefined)
        .map(k => {
          switch (k) {
            case 'hours':
              return (
                <Slider
                  range={[0, 23]}
                  value={time[k]}
                  key={k}
                  onChange={
                    value => onChange({ ...time, hours: value })
                  }
                />
              );
            case 'minutes':
              return (
                <Slider
                  range={[0, 59]}
                  value={time[k]}
                  key={k}
                  onChange={
                    value => onChange({ ...time, minutes: value })
                  }
                />
              );
            case 'seconds':
              return (
                <Slider
                  range={[0, 59]}
                  value={time[k]}
                  key={k}
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
