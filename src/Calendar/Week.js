// @flow

import * as React from 'react';
import classNames from 'classnames';
import moment from 'moment';
import type { Moment } from 'moment';
import _ from 'lodash';
import { getUnhandledProps, prefix } from 'rsuite-utils/lib/utils';
import { constants } from 'rsuite-utils/lib/Picker';

type Props = {
  weekendDate?: Moment,
  selected?: Moment,
  onSelect?: (date: Moment) => void,
  disabledDate?: (date: Moment) => boolean,
  inSameMonth?: (date: Moment) => boolean,
  className?: string,
  classPrefix?: string
};

class Week extends React.Component<Props> {

  static defaultProps = {
    classPrefix: `${constants.namespace}-calendar-week`,
    selected: moment()
  }

  shouldComponentUpdate(nextProps: Props) {
    return !_.isEqual(this.props, nextProps);
  }
  addPrefix = (name: string) => prefix(this.props.classPrefix)(name)

  renderDays() {
    const {
      weekendDate,
      disabledDate,
      inSameMonth,
      selected,
      onSelect
    } = this.props;

    let days = [];
    for (let i = 0; i < 7; i += 1) {

      let thisDate = moment(weekendDate).add(i, 'd');
      let disabled = disabledDate && disabledDate(thisDate);
      let isToday = thisDate.isSame(moment(), 'date');
      let classes = classNames(this.addPrefix('day'), {
        [this.addPrefix('day-un-same-month')]: !(inSameMonth && inSameMonth(thisDate)),
        [this.addPrefix('day-is-today')]: isToday,
        [this.addPrefix('day-selected')]: thisDate.isSame(selected, 'date'),
        [this.addPrefix('day-disabled')]: disabled

      });

      days.push(
        <div
          className={classes}
          role="menu"
          tabIndex="-1"
          title={isToday ? 'Today' : ''}
          onClick={() => {
            if (disabled) {
              return;
            }
            onSelect && onSelect(thisDate);
          }}
          key={i}
        >
          <span className={this.addPrefix('date-item')}>{thisDate.date()}</span>
        </div>
      );
    }
    return days;
  }

  render() {
    const {
      className,
      classPrefix,
      ...rest
    } = this.props;

    const classes = classNames(classPrefix, className);
    const unhandled = getUnhandledProps(Week, rest);

    return (
      <div
        {...unhandled}
        className={classes}
      >
        {this.renderDays()}
      </div>
    );
  }
}

export default Week;
