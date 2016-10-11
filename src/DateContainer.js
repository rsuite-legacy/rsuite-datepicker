import React, { PropTypes } from 'react';

const DateContainer = ({ placeholder, onClick, onClean }) => (
    <div className="dateContainer" onClick={onClick}>
        <div className="dateContainer-placeholder">{placeholder}</div>
        {
            onClean &&
            <div className="dateContainer-clean" onClick={
                (e) => {
                    e.stopPropagation();
                    onClean();
                }
            }>✕</div>
        }
    </div>
);

DateContainer.propTypes = {
    placeholder: PropTypes.string,
    onClick: PropTypes.func,
    onClean: PropTypes.func
};

export default DateContainer;
