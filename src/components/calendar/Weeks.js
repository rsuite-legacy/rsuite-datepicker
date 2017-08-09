import React from 'react';
import PropTypes from 'prop-types';
import Week from './Week';

const propTypes = {
  weeks: PropTypes.array,
  selected: PropTypes.instanceOf(Date),
  onClick: PropTypes.func,
  dateFilter: PropTypes.func
};

const Weeks = ({ weeks, selected, onClick, dateFilter }) => (
  <div className="weeks">
    {
      weeks.map((week, i) =>
        <Week
          key={i}
          weekendDate={week}
          selected={selected}
          onClick={onClick}
          dateFilter={dateFilter}
        />
      )
    }
  </div>
);

Weeks.propTypes = propTypes;

export default Weeks;
