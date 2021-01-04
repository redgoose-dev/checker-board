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

/**
 * initial custom event
 * 중복되는 `dom`에다 여러 이벤트를 넣고 싶을때(특히 window) 유니크한 이름으로 이벤트를 만들 수 있도록 커스텀 이벤트를 만들어서 사용할때 사용한다.
 * https://gist.github.com/yairEO/cb60592476a4204b27e83048949dbb45
 */
export function initCustomEvent()
{
  const events = {
    on(event, cb, opts)
    {
      if (!this.namespaces) this.namespaces = {};
      this.namespaces[event] = cb;
      const options = opts || false;
      this.addEventListener(event.split('.')[0], cb, options);
      return this;
    },
    off(event)
    {
      if (!this.namespaces[event]) return;
      this.removeEventListener(event.split('.')[0], this.namespaces[event]);
      delete this.namespaces[event];
      return this;
    },
  };
  window.on = document.on = Element.prototype.on = events.on;
  window.off = document.off = Element.prototype.off = events.off;
}
