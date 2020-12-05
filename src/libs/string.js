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
