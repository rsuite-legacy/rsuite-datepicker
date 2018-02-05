import * as React from 'react';
import moment from 'moment';
import type { Moment } from 'moment';
import classNames from 'classnames';
import { constants } from 'rsuite-utils/lib/Picker';
import { prefix, getUnhandledProps } from 'rsuite-utils/lib/utils';

type Props = {
  date?: Moment,
  onMoveForword?: () => void,
  onMoveBackward?: () => void,
  onToggleMonthDropdown?: () => void,
  onToggleTimeDropdown?: () => void,
  showMonth?: boolean,
  showDate?: boolean,
  showTime?: boolean,
  format?: string,
  disabledDate?: (date: Moment) => boolean,
  disabledTime?: (date: Moment) => boolean,
  classPrefix?: string
};

class Header extends React.Component<Props> {
  static defaultProps = {
    classPrefix: `${constants.namespace}-calendar-header`,
    date: moment()
  };
  getTimeFormat() {
    const { format } = this.props;
    const timeFormat = [];

    if (!format) {
      return '';
    }

    if (/(H|h)/.test(format)) {
      timeFormat.push('HH');
    }
    if (/m/.test(format)) {
      timeFormat.push('mm');
    }
    if (/s/.test(format)) {
      timeFormat.push('ss');
    }

    return timeFormat.join(':');
  }

  getDateFormat() {

    const { showDate, showMonth } = this.props;

    if (showDate) {
      return 'YYYY-MM-DD';
    } else if (showMonth) {
      return 'YYYY-MM';
    }

    return 'YYYY';
  }

  render() {
    const {
      date,
      onMoveForword,
      onMoveBackward,
      onToggleMonthDropdown,
      onToggleTimeDropdown,
      showTime,
      showDate,
      showMonth,
      classPrefix,
      className,
      disabledDate,
      disabledTime,
      ...rest
    } = this.props;

    const addPrefix = prefix(classPrefix);

    const dateTitleClasses = classNames(addPrefix('title'), {
      error: disabledDate && disabledDate(date)
    }, addPrefix('title-date'));

    const timeTitleClasses = classNames(addPrefix('title'), {
      error: disabledTime && disabledTime(date)
    }, addPrefix('title-time'));

    const dateContainer = [
      <i
        key="btn-backward"
        className={addPrefix('backward')}
        role="button"
        tabIndex="-1"
        onClick={onMoveBackward && onMoveBackward}
      />,
      <span
        key="title-date"
        role="button"
        tabIndex="-1"
        className={dateTitleClasses}
        onClick={onToggleMonthDropdown}
      >
        {date && date.format(this.getDateFormat())}
      </span>,
      <i
        key="btn-forward"
        className={addPrefix('forward')}
        role="button"
        tabIndex="-1"
        onClick={onMoveForword && onMoveForword}
      />
    ];

    const classes = classNames(classPrefix, className);
    const unhandled = getUnhandledProps(Header, rest);

    return (
      <div
        {...unhandled}
        className={classes}
      >
        {(showDate || showMonth) && dateContainer}
        {
          showTime ? (
            <span
              role="button"
              tabIndex="-1"
              className={timeTitleClasses}
              onClick={onToggleTimeDropdown}
            >
              {date && date.format(this.getTimeFormat())}
            </span>
          ) : null
        }
      </div>
    );
  }
}

export default Header;
