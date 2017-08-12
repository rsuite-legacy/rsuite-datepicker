import React, { Component } from 'react';

const contextTypes = {
  locale: React.PropTypes.object
};

class WeekHeader extends Component {

  render() {
    const { locale = { week: [] } } = this.context;
    return (
      <div className="week-header">
        {
          locale.week.map(item => (
            <span key={item} className="week-header-day">
              {item}
            </span>
          ))
        }
      </div>
    );
  }
}

WeekHeader.contextTypes = contextTypes;

export default WeekHeader;
