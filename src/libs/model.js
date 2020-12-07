import { dbInformation } from './const';

let DB = null;
let errorPrefix = 'indexedDB:';
let errorMessageStoreName = 'No store name.';
let errorMessageDatabase = `Can't get database.`;

/**
 * create database
 *
 * @param {IDBVersionChangeEvent} e
 */
function createDatabase(e)
{
  const db = e.target.result;
  // make `box` store
  const box = db.createObjectStore(dbInformation.store.box, {
    autoIncrement: true,
    keyPath: 'srl',
  });
  box.createIndex('Name', 'name', { unique: true });
  box.createIndex('Description', 'description', {});
  box.createIndex('Reset time', 'reset', {});
  // make `board` store
  const board = db.createObjectStore(dbInformation.store.board, {
    autoIncrement: true,
    keyPath: 'srl',
  });
  board.createIndex('Date', 'date', { unique: true });
  board.createIndex('Description', 'description', {});
}

/**
 * get database
 * make database and store, return database
 *
 * @return {Promise}
 */
export function modelGetDatabase()
{
  return new Promise((resolve, reject) => {
    if (DB) return resolve(DB);
    const request = window.indexedDB.open(dbInformation.name, dbInformation.version);
    // event - error
    request.onerror = e => reject(`${errorPrefix} ${e.target.errorCode}`);
    // event success
    request.onsuccess = e => {
      DB = e.target.result;
      resolve(DB);
    };
    // create store
    request.onupgradeneeded = e => createDatabase(e);
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
 *
 * @param {String} storeName
 * @return {Promise}
 */
export function modelGetCountItems(storeName)
{
  return new Promise((resolve, reject) => {
    if (!storeName) return reject(`${errorPrefix} ${errorMessageStoreName}`);
    const store = modelGetStore(storeName, 'readonly');
    const request = store.count(11);
    request.onsuccess = e => resolve(e.target.result);
  });
}

/**
 * get items
 *
 * @param {String} storeName
 * @return {Promise}
 */
export function modelGetItems(storeName)
{
  return new Promise((resolve, reject) => {
    if (!storeName) return reject(`${errorPrefix} ${errorMessageStoreName}`);
    const store = modelGetStore(storeName, 'readonly');
    const request = store.getAll();
    request.onsuccess = e => resolve(e.target.result);
  });
}

/**
 * get item
 *
 * @param {String} storeName
 * @param {Number} key
 * @return {Promise}
 */
export function modelGetItem(storeName, key)
{
  return new Promise((resolve, reject) => {
    if (!storeName) return reject(`${errorPrefix} ${errorMessageStoreName}`);
    const store = modelGetStore(storeName, 'readonly');
    const request = store.get(key);
    request.onsuccess = e => resolve(e.target.result);
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
 */
export function modelClearStore()
{
  //
}

/**
 * destroy database
 */
export function modelDestroyDatabase() {}
