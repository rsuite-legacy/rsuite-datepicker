import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';

const contextTypes = {
  locale: PropTypes.object,
};

class WeekHeader extends React.Component {
  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
  }

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
