import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { scrollTop } from 'dom-lib';
import moment from 'moment';
import MonthDropdownItem from './MonthDropdownItem';
import scrollTopAnimation from '../utils/scrollTopAnimation';
import decorate from '../utils/decorate';

const propTypes = {
  date: PropTypes.instanceOf(moment),
  onClick: PropTypes.func
};

const startYear = 1950;
const blockHeight = 84;

class MonthDropdown extends React.Component {

  componentDidMount() {
    this.updatePosition();
  }

  componentWillReceiveProps(nextProps) {
    this.updatePosition(nextProps);
  }

  updatePosition(props) {
    const { date } = props || this.props;
    date && this.scrollTo(date);
  }

  scrollTo = (date) => {
    const year = date.year();
    const top = ((year - startYear) * blockHeight);

    scrollTopAnimation(this.content, top, scrollTop(this.content) !== 0);
  }

  renderBlock() {
    const { date, onClick } = this.props;
    let ret = [];
    let selectedMonth = date.month();
    let selectedYear = date.year();
    let nextYear = 0;

    for (let i = 0; i < 100 && nextYear < selectedYear + 5; i += 1) {
      nextYear = startYear + i;

      let isSelectedYear = nextYear === selectedYear;
      let titleClasses = classNames(this.prefix('year-title'), {
        selected: isSelectedYear
      });

      ret.push(
        <div className={this.prefix('year-block')} key={i}>
          <div className={titleClasses}>{nextYear}</div>
          <div className={this.prefix('month-block')}>
            {
              [...Array(12).keys()].map((dateMonth) => {
                let cellCalsses = classNames(this.prefix('month-cell'), {
                  selected: isSelectedYear && dateMonth === selectedMonth
                });
                return (
                  <MonthDropdownItem
                    date={date}
                    className={cellCalsses}
                    onClick={onClick}
                    key={dateMonth}
                    dateMonth={dateMonth}
                    curYear={nextYear}
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

    return (
      <div className={this.props.defaultClassName}>
        <div
          className={this.prefix('content')}
          ref={(ref) => {
            this.content = ref;
          }}
        >
          <div className={this.prefix('scroll')}>
            {this.renderBlock()}
          </div>
        </div>
      </div>
    );
  }
}

MonthDropdown.propTypes = propTypes;

export default decorate({
  prefixClass: 'month-dropdown'
})(MonthDropdown);
