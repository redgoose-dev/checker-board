/**
 * printf
 *
 * @param {string} str
 * @param {string} values
 */
export function printf(str, ...values)
{
  for (let i = 0; i < values.length; i++)
  {
    let pattern = `\\{${i}\\}`;
    let replace = new RegExp(pattern, 'g');
    str = str.replace(replace, values[i]);
  }
  return str;
}

/**
 * 2 digit
 *
 * @param {Number|String} day
 * @return {String}
 */
export function twoDigit(day)
{
  return `0${day}`.slice(-2);
}

/**
 * counting checkbox in markdown
 *
 * @param {String} str
 * @return {Object}
 * */
export function countingCheckbox(str)
{
  let total = str ? (str.match(/\- \[x\]|\- \[ \]/g) || []).length : 0;
  let checked = str ? (str.match(/\- \[x\]/g) || []).length : 0;
  let percent = Math.floor(checked / total * 100);
  return { total, checked, percent };
}
