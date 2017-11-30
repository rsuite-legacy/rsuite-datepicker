const locale = {
  week: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  ok: 'OK',
  today: 'Today',
  yesterday: 'Yesterday',
  hours: 'Hours',
  minutes: 'Minutes',
  seconds: 'Seconds'
};

export default (firstDayOfWeek) => {
  if (firstDayOfWeek === 'Monday') {
    locale.week = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  }
  return locale;
};
