import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import decorate from './utils/decorate';


const propTypes = {
  placeholder: PropTypes.string,
  onClick: PropTypes.func,
  onClean: PropTypes.func,
  showCleanButton: PropTypes.bool,
  renderPlaceholder: PropTypes.func,
  value: PropTypes.instanceOf(moment),
};

class DateContainer extends Component {
  render() {
    const {
      placeholder,
      onClick,
      onClean,
      showCleanButton,
      renderPlaceholder,
      value
    } = this.props;

    return (
      <div
        className={this.prefix('toggle')}
        role="button"
        onClick={onClick}
        tabIndex="-1"
      >
        <div className={this.prefix('toggle-placeholder')}>
          {renderPlaceholder ? renderPlaceholder(placeholder, value) : placeholder}
        </div>
        {
          showCleanButton &&
          <div
            className={this.prefix('toggle-clean')}
            role="button"
            tabIndex="-1"
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

export default decorate()(DateContainer);
