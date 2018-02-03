// @flow

import * as React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import _ from 'lodash';
import { prefix } from 'rsuite-utils/lib/utils';
import { constants } from 'rsuite-utils/lib/Picker';

type Props = {
  className?: string,
  classPrefix?: string
}

class WeekHeader extends React.Component<Props> {

  static defaultProps = {
    classPrefix: `${constants.namespace}-calendar-week-header`
  }
  static contextTypes = {
    locale: PropTypes.object,
  };

  shouldComponentUpdate(nextProps: Props) {
    return !_.isEqual(this.props, nextProps);
  }

  render() {

    const { locale = { week: [] } } = this.context;
    const { className, classPrefix, ...props } = this.props;
    const classes = classNames(classPrefix, className);
    const addPrefix = prefix(classPrefix);

    return (
      <div
        {...props}
        className={classes}
      >
        {
          locale.week.map(item => (
            <span key={item} className={addPrefix('day')}>
              {item}
            </span>
          ))
        }
      </div>
    );
  }
}

export default WeekHeader;
