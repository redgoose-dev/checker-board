import { dateFormatType, monthNames } from './const';
import { useI18n } from 'vue-i18n';

/**
 * convert date format
 *
 * @param {Date} date
 * @param {number} type
 * @return {string}
 */
export function convertFormat(date, type) {
  const keys = Object.keys(dateFormatType);
  const twoDigit = (day) => `0${day}`.slice(-2);
  const year = date.getFullYear();
  const month = twoDigit(date.getMonth() + 1);
  const monthName = monthNames[date.getMonth()];
  const day = twoDigit(date.getDate());
  switch (type) {
    // 0000-00-00
    case Number(keys[0]):
    default:
      return `${year}-${month}-${day}`;
    // 00-00-0000
    case Number(keys[1]):
      return `${month}-${day}-${year}`;
    // 2020{0} 12{1} 25{2} (이 부분은 printf 방식으로 처리해야한다.)
    case Number(keys[2]):
      const { t } = useI18n({ useScope: 'global' });
      return `${year}${t('preference.year')} ${month}${t('preference.month')} ${day}${t('preference.day')}`;
    // 25 December, 2020
    case Number(keys[3]):
      return `${day} ${monthName}, ${year}`;
  }
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
