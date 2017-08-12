import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import decorate from './utils/decorate';


const propTypes = {
  placeholder: PropTypes.string,
  onClick: PropTypes.func,
  onClean: PropTypes.func,
  disabled: PropTypes.bool,
  showCleanButton: PropTypes.bool,
  renderPlaceholder: PropTypes.func,
  value: PropTypes.instanceOf(moment),
};

class DateContainer extends React.Component {
  render() {
    const {
      placeholder,
      onClick,
      onClean,
      showCleanButton,
      disabled,
      renderPlaceholder,
      value
    } = this.props;

    const classes = classNames(this.prefix('toggle'), { disabled });

    return (
      <div
        className={classes}
        role="button"
        onClick={!disabled && onClick}
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
              !disabled && onClean();
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
