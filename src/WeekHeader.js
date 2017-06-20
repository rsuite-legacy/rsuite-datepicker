import React from 'react';

let week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const WeekHeader = React.createClass({
  contextTypes: {
    locale: React.PropTypes.object
  },
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
});

export default WeekHeader;
