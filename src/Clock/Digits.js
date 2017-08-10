import React from 'react';
import PropTypes from 'prop-types';
import Digit from './Digit';

const Digits = ({ time }) => (
  <div className="digits">
    {
      ['hours', 'minutes', 'seconds']
        .filter(k => time[k] !== undefined)
        .map(k => <Digit key={k} number={time[k]} />)
        .reduce((prev, cur, idx) => {
          if (idx) {
            prev.push(<span className="separater" key={idx}>:</span>);
          }
          prev.push(cur);
          return prev;
        }, [])
    }
  </div>
);

Digits.propTypes = {
  time: PropTypes.shape({
    hours: PropTypes.number,
    minutes: PropTypes.number,
    seconds: PropTypes.number
  })
};

export default Digits;
