
import { PropTypes } from 'react';

export const clockPropTypes = {
  hourStep: PropTypes.number,
  minuteStep: PropTypes.number,
  secondStep: PropTypes.number,
  hourRange: PropTypes.array,
  minuteRange: PropTypes.array,
  secondRange: PropTypes.array,
  ruler: PropTypes.bool
};


export const clockDefaultProps = {
  hourStep: 1,
  minuteStep: 1,
  secondStep: 1,
  hourRange: [0, 23],
  minuteRange: [0, 59],
  secondRange: [0, 59],
  ruler: true
};

export function checkRange(range, defaultRange) {
  if (range[0] < defaultRange[0]) {
    throw Error(`"range[0]" must be greater than ${defaultRange[0]}`);
  }

  if (range[0] >= range[1]) {
    throw Error('`range[0]` must be less than `range[1]` ');
  }

  if (range[1] > defaultRange[1]) {
    throw Error(` "range[1]" must be less than ${defaultRange[1]}`);
  }
}
