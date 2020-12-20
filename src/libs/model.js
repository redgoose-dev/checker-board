import { dbInformation } from './const';
import { defaultModelData } from '@/assets/defaults';
import { checkToday, compareTime } from '@/libs/dates';

let DB = null;
let errorPrefix = 'indexedDB:';
let errorMessageStoreName = 'No store name.';
let errorMessageDatabase = `Can't get database.`;
let errorMessageNotKey = `No key`;

/**
 * create database
 *
 * @param {IDBVersionChangeEvent} e
 * @return {Promise}
 */
export function createDatabase(e)
{
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
    board.createIndex('date', 'date', { unique: true });
    board.createIndex('body', 'body', {});
    // complete transaction
    e.target.transaction.oncomplete = () => {
      // push default data
      modelAddItem('box', defaultModelData.box)
        .then(() => modelAddItem('board', defaultModelData.board))
        .then(resolve);
    };
  });
}

/**
 * initial database
 * make database and store.
 * 데이터베이스를 만드는것과 가져오는 타이밍이 복잡해서 명확하게 타이밍을 구분짓고,
 * 새로 데이터베이스를 만들었는지 이미 만들어진 데이터베이스를 가져온것인지 구분하는 값을 `resolve()`로 내놓는다.
 *
 * @return {Promise}
 */
export function modelInitialDatabase()
{
  return new Promise((resolve, reject) => {
    if (DB) return resolve(DB);
    const request = window.indexedDB.open(dbInformation.name, dbInformation.version);
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
export function removeDatabase() {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.deleteDatabase(dbInformation.name);
    request.onsuccess = () => resolve(true);
    request.onerror = () => reject('Error deleting database.');
  });
}

/**
 * get transaction
 *
 * @param {String} name
 * @param {String} mode
 * @return {IDBTransaction}
 */
export function modelGetTransaction(name, mode)
{
  if (!DB) throw new Error(`${errorPrefix} ${errorMessageDatabase}`);
  return DB.transaction(name, mode);
}

/**
 * get store
 *
 * @param {String} name
 * @param {String} mode
 * @return {IDBObjectStore}
 */
export function modelGetStore(name, mode)
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
export function modelAddItem(storeName, value)
{
  return new Promise((resolve, reject) => {
    if (!storeName) return reject(`${errorPrefix} ${errorMessageStoreName}`);
    const store = modelGetStore(storeName, 'readwrite');
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
 * get count items
 * TODO: 동작 검사하기.. 뭔가 문제있고, 필요엇으면 함수 삭제하기
 *
 * @param {String} storeName
 * @param {Number} key
 * @return {Promise}
 */
export function modelGetCountItems(storeName, key)
{
  return new Promise((resolve, reject) => {
    if (!storeName) return reject(`${errorPrefix} ${errorMessageStoreName}`);
    const store = modelGetStore(storeName, 'readonly');
    const request = store.count(key);
    request.onsuccess = e => resolve(e.target.result);
  });
}

/**
 * get items
 *
 * @param {String} storeName
 * @param {String} key
 * @param {String|Number|Boolean} value
 * @return {Promise<array>}
 */
export function modelGetItems(storeName, key = null, value= null)
{
  return new Promise((resolve, reject) => {
    if (!storeName) return reject(`${errorPrefix} ${errorMessageStoreName}`);
    const store = modelGetStore(storeName, 'readonly');
    const request = key && value ? store.index(key).getAll(value) : store.getAll();
    request.onsuccess = e => resolve(e.target?.result);
    request.onerror = e => resolve([]);
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
export function modelGetItem(storeName, key = null, value = null)
{
  return new Promise((resolve, reject) => {
    if (!storeName) return reject(`${errorPrefix} ${errorMessageStoreName}`);
    if (!key) return reject(`${errorPrefix} ${errorMessageNotKey}`);
    const store = modelGetStore(storeName, 'readonly');
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
export function modelEditItem(storeName, key, update, value)
{
  return new Promise((resolve, reject) => {
    if (!storeName) return reject(`${errorPrefix} ${errorMessageStoreName}`);
    const store = modelGetStore(storeName, 'readwrite');
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
 * remove item
 *
 * @param {String} storeName
 * @param {Number} key
 * @return {Promise}
 */
export function modelRemoveItem(storeName, key)
{
  return new Promise((resolve, reject) => {
    if (!storeName) return reject(`${errorPrefix} ${errorMessageStoreName}`);
    const store = modelGetStore(storeName, 'readwrite');
    const requestGetItem = store.count(key);
    requestGetItem.onsuccess = e => {
      if (e.target.result > 0)
      {
        const requestRemoveItem = store.delete(key);
        requestRemoveItem.onsuccess = e => resolve(true);
      }
      else
      {
        reject(`${errorPrefix} There are no items that can be remove.`);
      }
    };
  });
}

/**
 * clear store
 *
 * @param {String} storeName
 * @return {Promise}
 */
export function modelClearStore(storeName)
{
  return new Promise((resolve, reject) => {
    if (!storeName) return reject(`${errorPrefix} ${errorMessageStoreName}`);
    const store = modelGetStore(storeName, 'readwrite');
    const request = store.clear();
    request.onsuccess = () => resolve(true);
    request.onerror = (e) => reject(e.target.error);
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
    return await modelAddItem('board', prevItem ? {
      box,
      date: new Date,
      body: prevItem.body.replace(/\- \[x\]/g, '- [ ]'),
    } : {
      ...defaultModelData.board,
      box,
    });
  }

  // get and check box item
  let boxItem = await modelGetItem('box', box);
  if (!boxItem) throw new Error('no box');

  // check today item
  let boardItems = await modelGetItems('board', 'box', box);
  let lastBoardItem = boardItems[boardItems.length - 1];
  // 보드 아이템이 하나도 없을때
  if (!(boardItems && boardItems.length > 0))
  {
    await cloneItem(null);
    return;
  }
  // 현재 시간이 리셋 시간 이후이며 오늘날짜 보드 아이템이 없을때
  if (compareTime(boxItem?.reset) && !checkToday(lastBoardItem.date))
  {
    await cloneItem(lastBoardItem);
    return;
  }

  return lastBoardItem;
}

export function backupDatabase()
{
  // TODO: 작업예정
  return new Promise((resolve, reject) => {
    //
  });
}
