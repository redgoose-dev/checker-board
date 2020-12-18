import marked from 'marked';

/**
 * replace mark
 * https://stackoverflow.com/a/62697836
 *
 * @param {String} src
 * @param {RegExp} search
 * @param {String} replace
 * @param {Number} index
 * @return {String}
 */
function replaceMark(src, search, replace, index)
{
  let occurrence = 0;
  return src.replace(search, (match) => {
    occurrence++;
    if (occurrence === index) return replace;
    return match;
  });
}

/**
 * update body
 * https://stackoverflow.com/a/62697836
 *
 * @param {String} str
 * @param {HTMLElement} $target
 * @param {Function} changeCheckEvent
 */
export function updateBody(str, $target, changeCheckEvent)
{
  const onChangeCheckbox = e => {
    const index = Number(e.target.dataset?.index);
    const checkMark = e.target.checked ? 'x' : ' ';
    str = replaceMark(
      str,
      /\- \[[x|\s]\]/gmi,
      `- [${checkMark}]`,
      index + 1
    );
    // 수정된 소스로 호출한곳으로 콜백 이벤트로 호출한다.
    if (changeCheckEvent) changeCheckEvent(str).then();
  }

  // set renderer markdown
  const renderer = new marked.Renderer();
  renderer.listitem = (text, task) => {
    if (task)
    {
      text = text.replace('disabled="" ', '');
      return `<li class="checkbox-item"><label>${text}</label></li>`;
    }
    else
    {
      return `<li>${text}</li>`;
    }
  };

  // parse markdown
  let parsed = marked(str, { renderer });
  if (!parsed) return '';
  $target.innerHTML = parsed;

  // set checkboxes event
  const checkboxElements = $target.querySelectorAll('input[type=checkbox]');
  checkboxElements.forEach((o, k) => {
    o.setAttribute('data-index', String(k));
    o.addEventListener('change', onChangeCheckbox);
  });

  return parsed;
}

export function cloneBody()
{
  // TODO
}
