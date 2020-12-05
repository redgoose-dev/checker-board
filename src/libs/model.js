import { dbInformation } from './const';

let DB = null;
let errorPrefix = 'indexedDB:';

/**
 * get database
 * make database and store, return database
 *
 * @return {Promise}
 */
export function getDatabase()
{
  return new Promise((resolve, reject) => {
    if (DB) return resolve(DB);
    let request = window.indexedDB.open(dbInformation.name, dbInformation.version);
    // event - error
    request.onerror = e => reject(`${errorPrefix} ${e.target.errorCode}`);
    // event success
    request.onsuccess = e => {
      DB = e.target.result;
      resolve(DB);
    };
    // create store
    request.onupgradeneeded = e => {
      const db = e.target.result;
      // make `box` store
      let box = db.createObjectStore(dbInformation.store.box, {
        autoIncrement: true,
        keyPath: 'srl',
      });
      box.createIndex('Name', 'name', { unique: false });
      box.createIndex('Description', 'description', {});
      box.createIndex('Reset time', 'reset', {});
      // make `board` store
      let board = db.createObjectStore(dbInformation.store.board, {
        autoIncrement: true,
        keyPath: 'srl',
      });
      board.createIndex('Date', 'date', { unique: false });
      board.createIndex('Description', 'description', {});
    };
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
  if (!DB) throw new Error(`${errorPrefix} Can't get database.`);
  return DB.transaction(name, mode).objectStore(name);
}

/**
 * add data in store
 *
 * @param {String} storeName
 * @param {Object} value
 * @return {Promise}
 */
export function add(storeName, value)
{
  return new Promise((resolve, reject) => {
    if (!DB) return reject(`${errorPrefix} Can't get database.`);
    if (!storeName) return reject(`${errorPrefix} No store name.`);
    let store = getStore(storeName, 'readwrite');
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
 */
export function getItems()
{
  //
}

/**
 * get item
 */
export function getItem()
{
  //
}

/**
 * edit item
 */
export function editItem()
{
  //
}

/**
 * remove item
 */
export function removeItem()
{
  //
}

/**
 * clear store
 */
export function clear()
{
  //
}

/**
 * destroy database
 */
export function destroyDatabase() {}
