import React from 'react';

let week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const WeekHeader = React.createClass({
  contextTypes: {
    messages: React.PropTypes.object
  },
  render() {
    const { messages } = this.context;
    if (messages) {
      week = messages.week;
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
