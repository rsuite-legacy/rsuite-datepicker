import React, { Component } from 'react';

const contextTypes = {
  locale: React.PropTypes.object
};

let week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
class WeekHeader extends Component {

  render() {
    const { locale } = this.context;
    if (locale) {
      week = locale.week;
    }
    return (
      <div className="weekHeader">
        {
          week.map((item, index) => <span key={index} className="weekHeader-day">{item}</span>)
        }
      </div>
    );
  }
}
WeekHeader.contextTypes = contextTypes;

export default WeekHeader;
