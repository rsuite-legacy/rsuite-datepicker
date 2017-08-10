import React, { Component } from 'react';

const contextTypes = {
  locale: React.PropTypes.object
};

class WeekHeader extends Component {

  render() {
    const { locale } = this.context;
    return (
      <div className="weekHeader">
        {
          locale.week.map(item => (
            <span key={item} className="weekHeader-day">
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
