// @flow

import * as React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import type { Moment } from 'moment';

import _ from 'lodash';
import { FormattedMessage } from 'rsuite-intl';
import { getUnhandledProps, prefix } from 'rsuite-utils/lib/utils';
import { constants } from 'rsuite-utils/lib/Picker';

import isOneOf from './utils/isOneOf';

const { namespace } = constants;

type Range = {
  label: React.Node,
  closeOverlay?: boolean,
  value: Moment | (pageDate: Moment)=> Moment
}

type Props = {
  ranges: Array<Range>,
  className?: string,
  classPrefix?: string,
  pageDate?: Moment,
  onShortcut?: (value: Moment, closeOverlay?: boolean, event?: SyntheticEvent<*>) => void,
  onOk?: (event: SyntheticEvent<*>) => void,
  disabledOkButton?: (pageDate: Moment) => boolean
}

class Toolbar extends React.Component<Props> {

  static defaultProps = {
    classPrefix: `${namespace}-toolbar`,
    ranges: [{
      label: 'today',
      value: moment(),
      closeOverlay: true
    }, {
      label: 'yesterday',
      value: moment().add(-1, 'd'),
      closeOverlay: true,
    }]
  };

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name);

  hasLocaleKey = (key: any) => {
    const { ranges } = this.props;
    const keys = ranges.map(item => item.label);
    return isOneOf(key, keys);
  }

  renderOkButton() {
    const {
      disabledOkButton,
      pageDate,
      onOk
    } = this.props;

    const disabled = disabledOkButton && disabledOkButton(pageDate);
    const classes = classNames(this.addPrefix('right-btn-ok'), { disabled });
    return (
      <div className={this.addPrefix('right')}>
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
      classPrefix,
      ...rest
    } = this.props;

    const classes = classNames(classPrefix, className);
    const unhandled = getUnhandledProps(Toolbar, rest);

    return (
      <div
        {...unhandled}
        className={classes}
      >
        <div className={this.addPrefix('ranges')}>
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
                  onClick={(event) => {
                    !disabled && onShortcut && onShortcut(value, item.closeOverlay, event);
                  }}
                >
                  {
                    this.hasLocaleKey(item.label) ?
                      (<FormattedMessage id={item.label} />) : item.label
                  }
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

export default Toolbar;
