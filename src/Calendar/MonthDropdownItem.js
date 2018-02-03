// @flow

import * as React from 'react';
import moment from 'moment';
import type { Moment } from 'moment';
import _ from 'lodash';
import { getUnhandledProps } from 'rsuite-utils/lib/utils';

type Props = {
  date: Moment,
  month: number,
  year: number,
  onClick?: (month: number, event: SyntheticEvent<*>) => void,
  className?: string
};


class MonthDropdownItem extends React.Component<Props> {

  static defaultProps = {
    month: 0
  };

  shouldComponentUpdate(nextProps: Props) {
    return !_.isEqual(this.props, nextProps);
  }

  handleClick = (event: SyntheticEvent<*>) => {
    const { onClick, month, year, date } = this.props;
    onClick && onClick(moment(date).year(year).month(month - 1), event);
  }

  render() {
    const { className, month, ...rest } = this.props;
    const unhandled = getUnhandledProps(MonthDropdownItem, rest);
    return (
      <div
        {...unhandled}
        className={className}
        onClick={this.handleClick}
        key={month}
        role="button"
        tabIndex="-1"
      >
        {month}
      </div>
    );
  }
}

export default MonthDropdownItem;
