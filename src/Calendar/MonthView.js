// @flow

import * as React from 'react';
import moment from 'moment';
import type { Moment } from 'moment';
import classNames from 'classnames';
import { constants } from 'rsuite-utils/lib/Picker';
import { prefix } from 'rsuite-utils/lib/utils';

import Weeks from './Weeks';
import getMonthView from '../utils/getMonthView';

type Props = {
  activeDate?: Moment,
  onSelect?: (date: Moment) => void,
  disabledDate?: (date: Moment) => boolean,
  isoWeek?: boolean,
  className?: string,
  classPrefix?: string
};

// is two date in the same month
const inSameMonth = (dateA: Moment, dateB: Moment) => dateA.month() === dateB.month();
const getThisMonthDate = (date: Moment) => date.clone().date(1);

class MonthView extends React.Component<Props> {

  static defaultProps = {
    classPrefix: `${constants.namespace}-calendar-month-view`,
    activeDate: moment()
  };

  inSameThisMonthDate = (date: Moment) => {
    const thisMonthDate = getThisMonthDate(this.props.activeDate);
    return inSameMonth(date, thisMonthDate);
  }

  render() {

    const {
      activeDate,
      onSelect,
      disabledDate,
      className,
      classPrefix,
      isoWeek,
      ...rest
    } = this.props;

    const thisMonthDate = getThisMonthDate(activeDate);
    const addPrefix = prefix(classPrefix);
    const classes = classNames(classPrefix, className);

    return (
      <div
        {...rest}
        className={classes}
      >
        <div className={addPrefix('weeks-wrapper')}>
          <Weeks
            selected={activeDate}
            onSelect={onSelect}
            inSameMonth={this.inSameThisMonthDate}
            disabledDate={disabledDate}
            weeks={getMonthView(thisMonthDate, isoWeek)}
          />
        </div>
      </div>
    );
  }
}


export default MonthView;
