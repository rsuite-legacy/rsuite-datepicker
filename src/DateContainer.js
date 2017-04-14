import React, { PropTypes } from 'react';


const DateContainer = React.createClass({
  propTypes: {
    placeholder: PropTypes.string,
    onClick: PropTypes.func,
    onClean: PropTypes.func,
    showCleanButton: PropTypes.bool
  },
  render() {
    const { placeholder, onClick, onClean, showCleanButton } = this.props;
    return (
      <div className="dateContainer" onClick={onClick}>
        <div className="dateContainer-placeholder">{placeholder}</div>
        {
          showCleanButton &&
          <div className="dateContainer-clean" onClick={(e) => {
            e.stopPropagation();
            onClean();
          }}>✕</div>
        }
      </div>
    );
  }
});


export default DateContainer;
