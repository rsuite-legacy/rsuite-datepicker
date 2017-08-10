import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { scrollTop } from 'dom-lib';
import MonthDropdownItem from './MonthDropdownItem';


const propTypes = {
  date: PropTypes.instanceOf(Date),
  onClick: PropTypes.func
};

const startYear = 1950;
const topSpacing = 10;
const blockHeight = 64;

class MonthDropdown extends React.Component {

  componentDidMount() {
    const { date } = this.props;
    date && this.scrollTo(date);
  }

  scrollTo = (date) => {
    const year = date.getFullYear();
    scrollTop(this.content, ((year - startYear) * blockHeight) + topSpacing);
  }

  renderBlock() {
    const { date, onClick } = this.props;
    let ret = [];
    let selectedMonth = date.getMonth();
    let selectedYear = date.getFullYear();

    for (let i = 0; i < 100; i += 1) {
      let curYear = startYear + i;
      let isSelectedYear = curYear === selectedYear;
      let titleClasses = classNames('month-dropdown-year-title', {
        selected: isSelectedYear
      });

      ret.push(
        <div className="month-dropdown-year-block" key={i}>
          <div className={titleClasses}>{curYear}</div>
          <div className="month-dropdown-month-block">
            {
              [...Array(12).keys()].map((dateMonth) => {
                let cellCalsses = classNames('month-dropdown-month-cell', {
                  selected: isSelectedYear && dateMonth === selectedMonth
                });
                return (
                  <MonthDropdownItem
                    className={cellCalsses}
                    onClick={onClick}
                    key={dateMonth}
                    dateMonth={dateMonth}
                    curYear={curYear}
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
