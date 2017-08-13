import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import _ from 'lodash';
import decorate from './utils/decorate';


const propTypes = {
  placeholder: PropTypes.node,
  onClick: PropTypes.func,
  onClean: PropTypes.func,
  disabled: PropTypes.bool,
  showCleanButton: PropTypes.bool,
  renderPlaceholder: PropTypes.func,
  value: PropTypes.instanceOf(moment),
};

class DateContainer extends React.Component {

  renderToggleClean() {

    const { disabled, onClean } = this.props;

    return (
      <div
        className={this.prefix('toggle-clean')}
        role="button"
        tabIndex="-1"
        onClick={(e) => {
          !disabled && onClean();
          e.stopPropagation();
        }}
      >
        ✕
      </div>
    );
  }

  render() {

    const {
      placeholder,
      onClick,
      showCleanButton,
      disabled,
      renderPlaceholder,
      value,
      className,
      ...props
    } = this.props;

    const classes = classNames(this.prefix('toggle'), className, { disabled });
    const elementProps = _.omit(props, Object.keys(propTypes));

    return (
      <div
        {...elementProps}
        className={classes}
        role="button"
        onClick={!disabled && onClick}
        tabIndex="-1"
      >
        <div className={this.prefix('toggle-placeholder')}>
          {renderPlaceholder ? renderPlaceholder(placeholder, value) : placeholder}
        </div>
        {showCleanButton && this.renderToggleClean()}
      </div>
    );
  }
}

DateContainer.propTypes = propTypes;

export default decorate()(DateContainer);
