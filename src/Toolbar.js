import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import _ from 'lodash';
import decorate from './utils/decorate';
import { FormattedMessage } from './intl';

const propTypes = {
  ranges: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.node,
    unclosed: PropTypes.bool,
    value: PropTypes.oneOfType([
      PropTypes.instanceOf(moment),
      PropTypes.func
    ])
  })),
  pageDate: PropTypes.instanceOf(moment),
  onShortcut: PropTypes.func,
  onOk: PropTypes.func,
  disabledOkButton: PropTypes.func
};

const defaultProps = {
  ranges: [{
    label: 'today',
    value: moment()
  }, {
    label: 'yesterday',
    value: moment().add(-1, 'd')
  }]
};


class Toolbar extends Component {
  renderOkButton() {
    const {
      disabledOkButton,
      pageDate,
      onOk
    } = this.props;

    const disabled = disabledOkButton && disabledOkButton(pageDate);
    const classes = classNames(this.prefix('toolbar-right-btn-ok'), { disabled });
    return (
      <div className={this.prefix('toolbar-right')}>
        <button
          className={classes}
          onClick={!disabled && onOk}
        >
          <FormattedMessage id="ok" />
        </button>
      </div>
    );
  }
  render() {
    const {
      ranges,
      onShortcut,
      disabledOkButton,
      className,
      pageDate,
      ...props

    } = this.props;

    const classes = classNames(this.prefix('toolbar'), className);
    const elementProps = _.omit(props, Object.keys(propTypes));

    return (
      <div
        {...elementProps}
        className={classes}
      >
        <div className={this.prefix('toolbar-ranges')}>
          {
            ranges.map((item, index) => {
              let value = _.isFunction(item.value) ? item.value(pageDate) : item.value;
              let disabled = disabledOkButton && disabledOkButton(value);
              let itemClassName = classNames({ disabled });
              return (
                <a
                  /* eslint-disable */
                  key={index}
                  role="button"
                  tabIndex="-1"
                  className={itemClassName}
                  onClick={() => {
                    !disabled && onShortcut(value, item.unclosed, event);
                  }}
                >
                  <FormattedMessage id={item.label} />
                </a>
              );
            })
          }
        </div>
        {this.renderOkButton()}
      </div>
    );
  }
}

Toolbar.propTypes = propTypes;
Toolbar.defaultProps = defaultProps;

export default decorate()(Toolbar);

