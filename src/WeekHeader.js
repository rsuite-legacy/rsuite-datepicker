import React from 'react';
const WeekHeader = React.createClass({
  contextTypes: {
    messages: React.PropTypes.object
  },
  render() {
    const { messages } = this.context;
    return (
      <div className="weekHeader">
        {
          messages.week.map((item, index) => <span key={index} className="weekHeader-day">{item}</span>)
        }
      </div>
    );
  }
});

export default WeekHeader;
