import React from 'react';

const DateContainer = ({ placeholder, onClick, onClean } = props) => (
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

export default DateContainer;
