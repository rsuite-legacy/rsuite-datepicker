// @flow

import * as React from 'react';
import type { Moment } from 'moment';
import classNames from 'classnames';
import _ from 'lodash';
import { constants } from 'rsuite-utils/lib/Picker';
import Week from './Week';

type Props = {
  weeks: Array<any>,
  selected?: Moment,
  onSelect?: () => void,
  disabledDate?: (date: Moment) => boolean,
  inSameMonth?: (date: Moment) => boolean,
  className?: string,
  classPrefix?: string
};


class Weeks extends React.Component<Props> {
  static defaultProps = {
    classPrefix: `${constants.namespace}-calendar-weeks`,
    weeks: []
  };


  shouldComponentUpdate(nextProps: Props) {
    return !_.isEqual(this.props, nextProps);
  }

  render() {
    const {
      weeks,
      selected,
      onSelect,
      disabledDate,
      inSameMonth,
      className,
      classPrefix,
      ...rest
    } = this.props;

    const classes = classNames(classPrefix, className);

    return (
      <div
        {...rest}
        className={classes}
      >
        {
          weeks.map((week, index) => (
            <Week
              /* eslint-disable */
              key={index}
              weekendDate={week}
              selected={selected}
              onSelect={onSelect}
              inSameMonth={inSameMonth}
              disabledDate={disabledDate}
            />
          ))
        }
      </div>
    );
  }
}

export default Weeks;
