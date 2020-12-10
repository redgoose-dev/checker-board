/**
 * check support
 * 프로그램을 원활하게 사용할 수 있는 환경인지 검사한다.
 *
 * @return {Boolean}
 */
export function checkSupport()
{
  return (
    !!window &&
    !!window.indexedDB &&
    !!window.localStorage
  );
}

/**
 * sleep
 * delay tool
 *
 * @param {Number} delay
 * @return {Promise}
 */
export function sleep(delay = 1000)
{
  return new Promise((resolve, reject) => setTimeout(resolve, delay));
}
