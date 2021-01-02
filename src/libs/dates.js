import { useI18n } from 'vue-i18n';
import { twoDigit } from './string';

/**
 * convert date format
 *
 * @param {Date} date
 * @param {String} format
 * @return {String}
 */
export function convertFormat(date, format) {
  const { t } = useI18n({ useScope: 'global' });
  let mix = format.replace(/\{yyyy\}/, String(date.getFullYear()));
  mix = mix.replace(/\{mm\}/, twoDigit(date.getMonth() + 1));
  mix = mix.replace(/\{dd\}/, twoDigit(date.getDate()));
  mix = mix.replace(/\{month\}/, t(`month.${date.getMonth()}`));
  mix = mix.replace(/\{week\}/, t(`week.${date.getDay()}`));
  mix = mix.replace(/\{weekShort\}/, t(`weekShort.${date.getDay()}`));
  return mix;
}

/**
 * check today
 *
 * @param {Date} date
 * @return {boolean}
 */
export function checkToday(date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

/**
 * compare date
 *
 * @param {Date} date1
 * @param {Date} date2
 * @param {String} compare
 * @return {Boolean}
 * @throws
 * */
export function compareDate(date1, date2, compare = '<')
{
  if (!(date1 && date2)) throw new Error('no date1 or date2');
  let d1 = date1.setHours(0,0,0,0);
  let d2 = date2.setHours(0,0,0,0);
  switch (compare)
  {
    case '<':
      return d1 < d2;
    case '>':
      return d1 > d2;
    case '=':
    default:
      return d1 === d2;
  }
}

/**
 * set date
 *
 * @param {Number} year
 * @param {Number} month
 * @param {Number} date
 * @param {Array} hour
 * @return {Date}
 */
export function setTime(year, month, date, hour)
{
  let dd = new Date();
  if (year) dd.setFullYear(Number(year));
  if (month) dd.setMonth(Number(month));
  if (date) dd.setDate(Number(date));
  if (hour && hour.length) dd.setHours(hour[0] || 0, hour[1] || 0, hour[2] || 0, hour[3] || 0);
  return dd;
}
