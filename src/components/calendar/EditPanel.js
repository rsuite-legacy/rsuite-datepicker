import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';

const propTypes = {
  date: PropTypes.instanceOf(Date),
  onClick: PropTypes.func
};


class EditPanel extends Component {

  componentDidMount() {
    const { date } = this.props;
    date && this.scrollTo(date);
  }

  scrollTo = (date) => {
    const year = date.getFullYear();
    const topSpacing = 10;
    const blockHeight = 64;
    const startYear = 1950;
    const el = findDOMNode(this.refs.content);
    const scrollTop = (year - startYear) * blockHeight + topSpacing;
    el.scrollTop = scrollTop;
  }

  render() {
    const { date, onClick } = this.props;
    return (
      <div className="editPanel">
        <div className="editPanel-content" ref="content">
          <div className="editPanel-scroll">
            {
              (() => {
                let ret = [];
                let selectedMonth = date.getMonth();
                let selectedYear = date.getFullYear();
                let startYear = 1950;
                for (let i = 0; i < 100; i++) {
                  let curYear = startYear + i;
                  let isSelectedYear = curYear === selectedYear;
                  let yearBlock = (
                    <div className="editPanel-yearBlock" key={i}>
                      <div className={'editPanel-yearTitle' + (isSelectedYear ? ' selected' : '')}>{curYear}</div>
                      <div className='editPanel-monthBlock'>
                        {
                          [...Array(12).keys()].map(dateMonth =>
                            <div
                              className={'editPanel-monthCell' + (isSelectedYear && dateMonth === selectedMonth ? ' selected' : '')}
                              onClick={onClick.bind(null, new Date(curYear, dateMonth))}
                              key={dateMonth}
                            >
                              {dateMonth + 1}
                            </div>
                          )
                        }
                      </div>
                    </div>
                  );
                  ret.push(yearBlock);
                }
                return ret;
              })()
            }
          </div>
        </div>
      </div>
    );
  }
}

EditPanel.propTypes = propTypes;
export default EditPanel;
