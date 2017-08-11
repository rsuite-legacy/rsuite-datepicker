import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { scrollTop } from 'dom-lib';
import moment from 'moment';
import MonthDropdownItem from './MonthDropdownItem';


const propTypes = {
  date: PropTypes.instanceOf(moment),
  onClick: PropTypes.func
};

const startYear = 1950;
const blockHeight = 84;

class MonthDropdown extends React.Component {

  componentDidMount() {
    const { date } = this.props;
    date && this.scrollTo(date);
  }

  componentWillReceiveProps(nextProps) {
    const { date } = nextProps;
    date && this.scrollTo(date);
  }

  scrollTo = (date) => {
    const year = date.year();
    const top = ((year - startYear) * blockHeight);
    scrollTop(this.content, top);
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
      let titleClasses = classNames('month-dropdown-year-title', {
        selected: isSelectedYear
      });

      ret.push(
        <div className="month-dropdown-year-block" key={i}>
          <div className={titleClasses}>{nextYear}</div>
          <div className="month-dropdown-month-block">
            {
              [...Array(12).keys()].map((dateMonth) => {
                let cellCalsses = classNames('month-dropdown-month-cell', {
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
      <div className="month-dropdown">
        <div
          className="month-dropdown-content"
          ref={(ref) => {
            this.content = ref;
          }}
        >
          <div className="month-dropdown-scroll">
            {this.renderBlock()}
          </div>
        </div>
      </div>
    );
  }
}

MonthDropdown.propTypes = propTypes;

export default MonthDropdown;
