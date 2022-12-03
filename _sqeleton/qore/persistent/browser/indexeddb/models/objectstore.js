let _DEBUG = false

const config = (objectstore, conf) => {
  _DEBUG && console.log('ObjectStoreModel.config: objectstore, conf.indexes ', objectstore, conf.indexes)
  Object.entries(conf).forEach(c => {
    switch(c[0]) {
      case 'indexes':
        c[1].forEach(indx => objectstore.createIndex(...indx))
      break
    }
  })
}

const getAll = (objectstore, cb) => {
  ObjectStoreModel._db.transaction(objectstore).objectStore(objectstore).getAll().onsuccess = (event) => {
    cb && cb(event.target.result)
  }
}

const arrayFromCursor = (objectstore, cb) => {
  const cursorArray = []
  const storeForCursor = ObjectStoreModel._db.transaction(objectstore).objectStore(objectstore)

  storeForCursor.openCursor().onsuccess = (event) => {
    const cursor = event.target.result
    if (cursor) {
      cursorArray.push(cursor.value)
      cursor.continue()
    } else {
      cb && cb(cursorArray)
    }
  }
}

export const ObjectStoreModel = {
  _debug: (bool) => _DEBUG = bool,
  config, getAll,
  arrayFromCursor,
}