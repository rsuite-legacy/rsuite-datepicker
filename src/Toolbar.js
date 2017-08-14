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
    value: PropTypes.instanceOf(moment)
  })),
  pageDate: PropTypes.instanceOf(moment),
  onShortcut: PropTypes.func,
  onOk: PropTypes.func,
  disabledDate: PropTypes.func
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
      disabledDate,
      pageDate,
      onOk
    } = this.props;

    const disabled = disabledDate && disabledDate(pageDate);
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
      disabledDate,
      className,
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
              let disabled = disabledDate && disabledDate(item.value);
              let itemClassName = classNames({ disabled });
              return (
                <a
                  /* eslint-disable */
                  key={index}
                  role="button"
                  tabIndex="-1"
                  className={itemClassName}
                  onClick={() => {
                    !disabled && onShortcut(item.value, event);
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

