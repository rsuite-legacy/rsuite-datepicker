import React from 'react';
import PropTypes from 'prop-types';

function leftPad(number) {
  number = ` ${number}`;
  const pad = number.length < 2 ? '0' : '';
  return pad + number;
}

const Digit = ({
    number
}) => (
    <span className="digit-number"> {leftPad(number)} </span>
  );

Digit.propTypes = {
  number: PropTypes.number
};

export default Digit;
