import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  date: PropTypes.instanceOf(Date),
  onClick: PropTypes.func
};


class TimeDropdown extends React.Component {

  render() {

    return (
      <div className="time-dropdown">
        <div
          className="time-dropdown-content"
          ref={(ref) => {
            this.content = ref;
          }}
        >
          <div className="column">
            {'111111'}
          </div>
        </div>
      </div>
    );
  }
}

TimeDropdown.propTypes = propTypes;

export default TimeDropdown;
