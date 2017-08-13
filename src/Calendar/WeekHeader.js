import React from 'react';
import classNames from 'classnames';

const contextTypes = {
  locale: React.PropTypes.object
};

class WeekHeader extends React.Component {

  render() {

    const { locale = { week: [] } } = this.context;
    const { className, ...props } = this.props;
    const classes = classNames('week-header', className);

    return (
      <div
        {...props}
        className={classes}
      >
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
