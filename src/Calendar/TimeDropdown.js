import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const propTypes = {
  date: PropTypes.instanceOf(Date),
  onClick: PropTypes.func
};


class TimeDropdown extends React.Component {

  renderColumn(start, end, step = 1) {

    const items = [];
    for (let i = start; i <= end; i += 1) {
      items.push(<li key={i}><a>{i}</a></li>);
    }

    return (
      <div className="column">
        <ul>{items}</ul>
      </div>
    );
  }

  render() {

    return (
      <div className="time-dropdown">
        <div
          className="time-dropdown-content"
          ref={(ref) => {
            this.content = ref;
          }}
        >
          <div className="time-dropdown-content-row">
            {this.renderColumn(0, 23)}
            {this.renderColumn(0, 59)}
            {this.renderColumn(0, 59)}
          </div>
        </div>
      </div>
    );
  }
}

TimeDropdown.propTypes = propTypes;

export default TimeDropdown;
