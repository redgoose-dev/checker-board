/**
 * check support
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
