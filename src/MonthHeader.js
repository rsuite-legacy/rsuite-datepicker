import React, { PropTypes } from 'react';

const MonthHeader = ({ date, onMoveForword, onMoveBackward, onClickTitle }) => (
    <div className="monthHeader">
        <i className="monthHeader-backward"
            onClick={onMoveBackward}
            >
            {String.fromCharCode(9664)}
        </i>
        <span className="monthHeader-title" onClick={onClickTitle}>
        { date.getFullYear() + ' - ' + (date.getMonth() + 1) }
        </span>
        <i className="monthHeader-forward"
            onClick={onMoveForword}
            >
           {String.fromCharCode(9654)}
        </i>
    </div>
);

export default MonthHeader;
