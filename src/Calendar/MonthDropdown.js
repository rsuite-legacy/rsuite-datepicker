// @flow

import * as React from 'react';
import classNames from 'classnames';
import { scrollTop } from 'dom-lib';
import moment from 'moment';
import type { Moment } from 'moment';
import _ from 'lodash';
import { constants } from 'rsuite-utils/lib/Picker';
import { prefix, getUnhandledProps } from 'rsuite-utils/lib/utils';

import MonthDropdownItem from './MonthDropdownItem';
import scrollTopAnimation from '../utils/scrollTopAnimation';

type Props = {
  onClick?: (month: number, event: SyntheticEvent<*>) => void,
  show: boolean,
  date: Moment,
  yearCeiling?: number,
  className?: string,
  classPrefix?: string
};

const startYear = 1950;
const blockHeight = 84;

class MonthDropdown extends React.Component<Props> {

  static defaultProps = {
    classPrefix: `${constants.namespace}-calendar-month-dropdown`,
    show: false,
    date: moment()
  };

  componentDidMount() {
    this.updatePosition();
  }

  componentWillReceiveProps(nextProps: Props) {
    this.updatePosition(nextProps);
  }

  shouldComponentUpdate(nextProps: Props) {
    return nextProps.show && !_.isEqual(this.props, nextProps);
  }

  updatePosition(props?: Props) {
    const { date } = props || this.props;
    date && this.scrollTo(date);
  }

  scrollTo = (date: Moment) => {
    const year = date.year();
    const top = ((year - startYear) * blockHeight);

    scrollTopAnimation(this.content, top, scrollTop(this.content) !== 0);
  };

  content = null;

  addPrefix = (name: string) => prefix(this.props.classPrefix)(name)

  renderBlock() {

    const { date, onClick, yearCeiling } = this.props;

    let ret = [];
    let selectedMonth = date.month();
    let selectedYear = date.year();
    let nextYear = 0;

    for (let i = 0; i < 100 && nextYear < selectedYear + yearCeiling; i += 1) {

      nextYear = startYear + i;

      let isSelectedYear = nextYear === selectedYear;
      let titleClasses = classNames(this.addPrefix('year-title'), {
        selected: isSelectedYear
      });

      ret.push(
        <div className={this.addPrefix('year-block')} key={i}>
          <div className={titleClasses}>{nextYear}</div>
          <div className={this.addPrefix('month-block')}>
            {
              /* eslint-disable */
              [...Array(12)].map((i, month) => {
                let cellCalsses = classNames(this.addPrefix('month-cell'), {
                  selected: isSelectedYear && month === selectedMonth
                });
                return (
                  <MonthDropdownItem
                    date={date}
                    className={cellCalsses}
                    onClick={onClick}
                    key={month}
                    month={month + 1}
                    year={nextYear}
                  />
                );
              })
            }
          </div>
        </div>
      );
    }

    return ret;
  }

  render() {

    const { classPrefix, className, ...rest } = this.props;
    const classes = classNames(classPrefix, className);
    const unhandled = getUnhandledProps(MonthDropdown, rest);
    return (
      <div
        {...unhandled}
        className={classes}
      >
        <div
          className={this.addPrefix('content')}
          ref={(ref) => {
            this.content = ref;
          }}
        >
          <div className={this.addPrefix('scroll')}>
            {this.renderBlock()}
          </div>
        </div>
      </div>
    );
  }
}

export default MonthDropdown;
