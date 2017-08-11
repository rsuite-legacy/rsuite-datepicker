import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Week from './Week';

const propTypes = {
  weeks: PropTypes.array,
  selected: PropTypes.instanceOf(moment),
  onClick: PropTypes.func,
  disabledDate: PropTypes.func,
  inSameMonth: PropTypes.func
};

const Weeks = ({ weeks, selected, onClick, disabledDate, inSameMonth }) => (
  <div className="weeks">
    {
      weeks.map((week, i) =>
        <Week
          key={i}
          weekendDate={week}
          selected={selected}
          onClick={onClick}
          inSameMonth={inSameMonth}
          disabledDate={disabledDate}
        />
      )
    }
  </div>
);

Weeks.propTypes = propTypes;

export default Weeks;
