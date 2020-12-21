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
 * @param {String} body
 * @param {HTMLElement} $el
 * @param {Boolean} today
 * @param {Function} callback
 */
export function updateBody({ body, $el, today, callback })
{
  const onChangeCheckbox = e => {
    const index = Number(e.target.dataset?.index);
    const checkMark = e.target.checked ? 'x' : ' ';
    body = replaceMark(
      body,
      /\- \[[x|\s]\]/gmi,
      `- [${checkMark}]`,
      index + 1
    );
    // 수정된 소스로 호출한곳으로 콜백 이벤트로 호출한다.
    if (callback) callback(body).then();
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
  let parsed = marked(body, { renderer });
  if (!parsed) return '';
  $el.innerHTML = parsed;

  // set checkboxes event
  const checkboxElements = $el.querySelectorAll('input[type=checkbox]');
  checkboxElements.forEach((o, k) => {
    if (today)
    {
      o.setAttribute('data-index', String(k));
      o.addEventListener('change', onChangeCheckbox);
    }
    else
    {
      o.setAttribute('disabled', 'disabled');
    }
  });

  return parsed;
}
