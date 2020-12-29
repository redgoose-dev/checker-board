function checkObject()
{
  return !!window.localStorage;
}

/***
 * get value in localStorage
 *
 * @param {String} key
 * @param {Boolean} parse
 * @returns {any}
 */
export function get(key, parse = false)
{
  if (!checkObject()) return undefined;
  if (!key) return undefined;
  let result = window.localStorage.getItem(key);
  if (parse)
  {
    return JSON.parse(result);
  }
  else
  {
    return result;
  }
}

/**
 * set value in localStorage
 *
 * @param {String} key
 * @param {any} value
 */
export function set(key, value)
{
  if (!checkObject()) return undefined;
  if (!(key && value)) return undefined;
  if (!(typeof value === 'string' || typeof value === 'number'))
  {
    value = JSON.stringify(value);
  }
  window.localStorage.setItem(key, value);
}

/**
 * remove key in localStorage
 *
 * @param {String} key
 */
export function remove(key)
{
  if (!checkObject()) return undefined;
  if (!key) return undefined;
  window.localStorage.removeItem(key);
}

/**
 * set value in localStorage
 *
 * @param {String} key
 * @return {Boolean}
 */
export function check(key)
{
  if (!checkObject()) return undefined;
  if (!key) return undefined;
  return !!window.localStorage.getItem(key);
}
