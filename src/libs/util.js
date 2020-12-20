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

/**
 * convert pure object
 * `proxy`, `observerble`객체를 순수한 객체로 변환해준다.
 */
export function convertPureObject(obj)
{
  if (!obj) return null;
  return JSON.parse(JSON.stringify(obj));
}

/**
 * change theme
 *
 * @param {String} theme
 */
export function changeTheme(theme)
{
  if (!theme) return;
  const $html = document.querySelector('html');
  if ($html.classList.contains(theme)) return;
  $html.dataset.color = theme;
}