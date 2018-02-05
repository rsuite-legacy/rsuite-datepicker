// @flow

import * as React from 'react';
import moment from 'moment';
import type { Moment } from 'moment';
import classNames from 'classnames';
import { constants } from 'rsuite-utils/lib/Picker';

import Table from './Table';
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
    classPrefix: `${constants.namespace}-calendar-view`,
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
    const classes = classNames(classPrefix, className);

    return (
      <div
        {...rest}
        className={classes}
      >
        <Table
          selected={activeDate}
          onSelect={onSelect}
          inSameMonth={this.inSameThisMonthDate}
          disabledDate={disabledDate}
          isoWeek={isoWeek}
          rows={getMonthView(thisMonthDate, isoWeek)}
        />
      </div>
    );
  }
}


export default MonthView;
