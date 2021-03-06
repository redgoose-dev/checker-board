import { dbInformation } from './const';
import { defaultModelData } from '@/assets/defaults';
import { compareDate } from '@/libs/dates';
import { playQueue } from '@/libs/util';
import { countingCheckbox } from '@/libs/string';

let DB = null;
let errorPrefix = 'indexedDB:';
let errorMessageStoreName = 'No store name.';
let errorMessageDatabase = `Can't get database.`;
let errorMessageNotKey = `No key`;
let errorMessageNotValue = `No value`;

/**
 * create database
 *
 * @param {IDBVersionChangeEvent} e
 * @return {Promise}
 */
export function createDatabase(e = null)
{
  const transaction = e ? e.target.transaction : DB;
  return new Promise((resolve, reject) => {
    // make `box` store
    const box = DB.createObjectStore(dbInformation.store.box, {
      autoIncrement: true,
      keyPath: 'srl',
    });
    box.createIndex('name', 'name', { unique: true });
    box.createIndex('description', 'description', {});
    box.createIndex('reset', 'reset', {});
    // make `board` store
    const board = DB.createObjectStore(dbInformation.store.board, {
      autoIncrement: true,
      keyPath: 'srl',
    });
    board.createIndex('box', 'box', { unique: false });
    board.createIndex('date', 'date', {});
    board.createIndex('body', 'body', {});
    board.createIndex('percent', 'percent', {});
    // complete transaction
    transaction.oncomplete = () => resolve();
  });
}

/**
 * initial database
 * make database and store.
 * 데이터베이스를 만드는것과 가져오는 타이밍이 복잡해서 명확하게 타이밍을 구분짓고,
 * 새로 데이터베이스를 만들었는지 이미 만들어진 데이터베이스를 가져온것인지 구분하는 값을 `resolve()`로 내놓는다.
 *
 * @param {Number} version
 * @return {Promise}
 */
export function initialDatabase(version)
{
  return new Promise((resolve, reject) => {
    if (DB) return resolve(DB);
    if (!version) version = dbInformation.version;
    const request = window.indexedDB.open(dbInformation.name, version);
    let upgradeneeded = false;
    // event - error
    request.onerror = e => reject(`${errorPrefix} ${e.target.errorCode}`);
    // event success
    request.onsuccess = e => {
      DB = e.target.result;
      if (!upgradeneeded) resolve(null);
    };
    // create store
    request.onupgradeneeded = e => {
      upgradeneeded = true;
      DB = e.target.result;
      createDatabase(e).then(() => resolve('create'));
    };
  });
}

/**
 * remove database
 *
 * @return {Promise}
 */
export function removeDatabase()
{
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.deleteDatabase(dbInformation.name);
    request.onsuccess = () => {
      if (DB) DB.close();
      DB = null;
      resolve(true);
    };
    request.onerror = () => reject('Error deleting database.');
    request.onblocked = () => {
      if (DB) DB.close();
      DB = null;
      resolve(true);
    };
  });
}

/**
 * restore database
 * 데이터베이스를 삭제하고 데이터를 복구한다.
 *
 * @param {Array|Object} box
 * @param {Array|Object} board
 * @return {Promise}
 * */
export async function restoreDatabase(box, board)
{
  // remove database
  await removeDatabase();
  // re initialize database
  await initialDatabase(null);
  // set data box,board
  box = box?.length > 0 ? box : [ defaultModelData.box ];
  board = board?.length > 0 ? board : [ defaultModelData.board ];
  // add items
  await playQueue(box, async (item) => {
    await addItem('box', {
      name: item.name || '',
      description: item.description || '',
      reset: item.reset || '05:00',
    });
  });
  await playQueue(board, async (item) => {
    // set percent
    let percent = (item.body && item.percent === undefined) ? countingCheckbox(item.body).percent : item.percent;
    // add item
    await addItem('board', {
      box: item.box || 1,
      date: new Date(item.date || undefined),
      body: item.body || '',
      percent,
    });
  });
}

/**
 * get store
 *
 * @param {String} name
 * @param {String} mode
 * @return {IDBObjectStore}
 */
export function getStore(name, mode)
{
  if (!DB) throw new Error(`${errorPrefix} ${errorMessageDatabase}`);
  return DB.transaction(name, mode).objectStore(name);
}

/**
 * add data in store
 *
 * @param {String} storeName
 * @param {Object} value
 * @return {Promise}
 */
export function addItem(storeName, value)
{
  return new Promise((resolve, reject) => {
    if (!storeName) return reject(`${errorPrefix} ${errorMessageStoreName}`);
    const store = getStore(storeName, 'readwrite');
    try
    {
      const req = store.add(value);
      req.onsuccess = e => resolve(e.target.result);
      req.onerror = e => reject(e.target.error.message);
    }
    catch(e)
    {
      reject(`${errorPrefix} Failed add data.`);
    }
  });
}

/**
 * get items
 *
 * @param {Object} opt
 * @return {Promise<array>}
 */
export function getItems(opt)
{
  function filtering(items)
  {
    opt.sort = opt.sort === 'desc' ? 'desc' : 'asc';
    if (opt.where && opt.range)
    {
      items = items.filter(o => o[opt.where.key] === opt.where.value);
    }
    if (opt.order)
    {
      items.sort(function(a, b) {
        switch (opt.order)
        {
          case 'date':
            a = a[opt.order].getTime();
            b = b[opt.order].getTime();
            break;
          default:
            a = a[opt.order];
            b = b[opt.order];
            break;
        }
        return parseFloat(a) - parseFloat(b);
      });
    }
    if (opt.sort === 'desc') items = items.reverse();
    return items;
  }

  return new Promise((resolve, reject) => {
    if (!opt.store) return reject(`${errorPrefix} ${errorMessageStoreName}`);
    const store = getStore(opt.store, 'readonly');
    let request = null;
    if (opt.range)
    {
      request = store.index(opt.range.key).getAll(IDBKeyRange.bound(opt.range.value[0], opt.range.value[1]));
    }
    else if (opt.where)
    {
      request = store.index(opt.where.key).getAll(opt.where.value);
    }
    else
    {
      request = store.getAll();
    }
    request.onsuccess = e => resolve(filtering(e.target?.result || []));
    request.onerror = () => resolve([]);
  });
}

/**
 * get item
 *
 * @param {String} storeName
 * @param {Number|String} key
 * @param {Number|String|Boolean} value
 * @return {Promise<object|null>}
 */
export function getItem(storeName, key = null, value = null)
{
  return new Promise((resolve, reject) => {
    if (!storeName) return reject(`${errorPrefix} ${errorMessageStoreName}`);
    if (!key) return reject(`${errorPrefix} ${errorMessageNotKey}`);
    const store = getStore(storeName, 'readonly');
    const request = key && value ? store.index(key).get(value) : store.get(key);
    request.onsuccess = e => resolve(e.target.result);
    request.onerror = e => resolve(null);
  });
}

/**
 * edit item
 *
 * @param {String} storeName
 * @param {Number} key
 * @param {Boolean} update - update or replace data
 * @param {Object} value
 * @return {Promise}
 */
export function editItem(storeName, key, update, value)
{
  return new Promise((resolve, reject) => {
    if (!storeName) return reject(`${errorPrefix} ${errorMessageStoreName}`);
    const store = getStore(storeName, 'readwrite');
    const requestGetItem = store.get(key);
    requestGetItem.onsuccess = e => {
      if (e.target.result)
      {
        const requestEditItem = store.put(update ? {
          ...e.target.result,
          ...value,
          srl: key,
        } : {
          ...value,
          srl: key,
        });
        requestEditItem.onsuccess = e => resolve(true);
      }
      else
      {
        reject(`${errorPrefix} There are no items that can be edit.`);
      }
    };
  });
}

/**
 * remove items
 *
 * @param {String} storeName
 * @param {String|Number|Boolean} value
 * @param {String} key
 * @return {Promise<boolean>}
 */
export function removeItems(storeName, value, key = null)
{
  return new Promise((resolve, reject) => {
    if (!storeName) return reject(`${errorPrefix} ${errorMessageStoreName}`);
    if (!value) return reject(`${errorPrefix} ${errorMessageNotValue}`);
    const store = getStore(storeName, 'readwrite');
    if (key)
    {
      const index = store.index(key);
      const req = index.openCursor(IDBKeyRange.only(value));
      req.onsuccess = (e) => {
        const cursor = e.target?.result;
        if (cursor)
        {
          cursor.delete();
          cursor.continue();
        }
        else
        {
          resolve(true);
        }
      }
    }
    else
    {
      const req = store.delete(Number(value));
      req.onsuccess = () => resolve(true);
    }
  });
}

/**
 * clear store
 *
 * @param {String} storeName
 * @return {Promise}
 */
export function clearStore(storeName)
{
  return new Promise((resolve, reject) => {
    if (!storeName) return reject(`${errorPrefix} ${errorMessageStoreName}`);
    const store = getStore(storeName, 'readwrite');
    const req = store.clear();
    req.onsuccess = () => resolve();
  });
}

/**
 * make today item
 * 리셋시간이 지났을때 새로운 데이터를 만드는 일을한다.
 *
 * @param {Number} box
 * @return {Promise}
 */
export async function makeTodayItem(box)
{
  /**
   * clone item
   *
   * @param {Object} prevItem
   * @return {Promise}
   */
  async function cloneItem(prevItem)
  {
    return await addItem('board', prevItem ? {
      box,
      date: new Date,
      body: prevItem.body.replace(/\- \[x\]/g, '- [ ]'),
    } : {
      ...defaultModelData.board,
      box,
    });
  }

  // get and check box item
  let boxItem = await getItem('box', box);
  if (!boxItem) throw new Error('no box');

  // check today item
  let boardItems = await getItems({
    store: 'board',
    where: { key: 'box', value: box },
    order: 'date',
    sort: 'asc',
  });
  if (!(boardItems && boardItems.length > 0))
  {
    let res = await cloneItem(null);
    return await getItem('board', res);
  }
  let lastBoardItem = boardItems[boardItems.length - 1];
  // 새로운 보드 아이템이 만들어지는 조건을 통과하면 아이템이 복제된다.
  // 아이템이 클론되는 조건이 다음과 같다.
  // 조건1: 현재시간이 리셋시간보다 높아야한다.
  // 조건2: 마지막 아이템의 날짜가 어제까지.. (오늘, 그 후는 false)
  const now = new Date();
  const reset = new Date();
  reset.setHours(Number(boxItem?.reset.split(':')[0]));
  reset.setMinutes(Number(boxItem?.reset.split(':')[1]));
  reset.setSeconds(0);
  reset.setMilliseconds(0);
  if ((now.getTime() > reset.getTime()) && compareDate(lastBoardItem.date, now, '<'))
  {
    let res = await cloneItem(lastBoardItem);
    return await getItem('board', res);
  }

  return lastBoardItem;
}
