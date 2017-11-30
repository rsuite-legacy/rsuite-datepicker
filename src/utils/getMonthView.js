/**
 * Get all weeks of this month
 * @params monthDate
 * @return date[]
 */
export default function getMonthView(monthDate, firstDayOfWeek) {

  let firstDayOfMonth = monthDate.day();
  let distance = firstDayOfWeek === 'Monday' ? 1 - firstDayOfMonth : 0 - firstDayOfMonth;
  let firstWeekendDate = monthDate.clone().add(distance, 'days');

  let weeks = [firstWeekendDate];
  let nextWeekendDate = firstWeekendDate.clone().add(7, 'days');

  weeks.push(nextWeekendDate);
  while (weeks.length < 6) {
    nextWeekendDate = nextWeekendDate.clone().add(7, 'days');
    weeks.push(nextWeekendDate);
  }

  return weeks;
}
