// delete to next comment when ready for typescript support: // @ts-check
import { Models } from './models/index.js'

// https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB#structuring_the_database
// Key Path (keyPath)
// Key Generator (autoIncrement)

/* TODO: Spread and iterate + yield*/
// _DEBUG && console.log('configIndexedDB_dq', configIndexedDB_dq)
const {
  _DEBUG = false,
  _dbName: dbName,
  _dbVersion: dbVersion,
  ...objectStores
} = configIndexedDB_dq

Models.ObjectStore._debug(_DEBUG)
Models.Transaction._debug(_DEBUG)

let db
const request = indexedDB.open(dbName, dbVersion)
function *createObjStores(db) {
  for (const objectStore of Object.entries(objectStores)) {
    const createObjectStoreArgs = [objectStore[0], { autoIncrement : true }]
    if(objectStore[1].keyPath) {
      createObjectStoreArgs.pop()
      createObjectStoreArgs.push({keyPath: objectStore[1].keyPath})
    }
    yield db.createObjectStore(...createObjectStoreArgs)
  }
}

request.onupgradeneeded = (event) => { // initial when database DNE
  // The only place where you can alter the structure of the database
  _DEBUG && console.log('db Created', event)
  const db = event.target.result // Save the IDBDatabase interface
  if (Object.keys(objectStores).length) {
    for(const objStoreGen of createObjStores(db)) {
      objectStores[objStoreGen.name].indexes
        && Models.ObjectStore.config(objStoreGen, {indexes:objectStores[objStoreGen.name].indexes})
      objectStores[objStoreGen.name].data
        && objectStores[objStoreGen.name].data.forEach(datum => objStoreGen.add(datum))
    }
  }
}

request.onsuccess = (event) => { // initial when database DOES EXIST
  db = event.target.result
  _DEBUG && console.log('db Loaded', db)
  // not a fan of anything below - improve when making this finalized
  Models._db(db)
  configIndexedDB_dq._LOADED_DB = db
  configIndexedDB_dq._Transaction = Models.Transaction
  configIndexedDB_dq._ObjectStore = Models.ObjectStore
}

request.onerror = (event) => {
  console.error(`Database error: ${event.target.errorCode}`)
}