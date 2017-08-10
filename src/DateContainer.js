import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  placeholder: PropTypes.string,
  onClick: PropTypes.func,
  onClean: PropTypes.func,
  showCleanButton: PropTypes.bool
};

class DateContainer extends Component {
  render() {
    const { placeholder, onClick, onClean, showCleanButton } = this.props;
    return (
      <div
        className="toggle"
        role="button"
        onClick={onClick}
        tabIndex="-1"
      >
        <div className="toggle-placeholder">{placeholder}</div>
        {
          showCleanButton &&
          <div
            className="toggle-clean"
            onClick={(e) => {
              e.stopPropagation();
              onClean();
            }}
          >
            ✕
            </div>
        }
      </div>
    );
  }
}
DateContainer.propTypes = propTypes;

export default DateContainer;
