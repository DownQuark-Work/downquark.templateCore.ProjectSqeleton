let _DEBUG = false
const TRANSACTION_TYPES = {
  ADD:'ADD',
  DELETE:'DELETE',
  GET:'GET',
  UPDATE:'PUT',
}

const _baseTransaction = (type=TRANSACTION_TYPES.GET, props) => {
  const transactionType = type !== TRANSACTION_TYPES.GET ? [props.objectstore, 'readwrite'] : [props.objectstore]
  let curObjectStore = TransactionModel._db.transaction(...transactionType).objectStore(props.objectstore)
  if(props.index){curObjectStore = curObjectStore.index(props.index)}
  
  let dbReq
  if(type === TRANSACTION_TYPES.ADD){
    dbReq = TransactionModel._db.transaction(...transactionType)
    props.data.forEach(datum => {
      const addReq = curObjectStore[type.toLowerCase()](datum)
      addReq.onsuccess = (event) => {
        _DEBUG && console.log('added', event.target.result)
      }
    })
    props.cb && props.cb({ADDED: props.data})
  }
  else {
    dbReq = curObjectStore[type.toLowerCase()](props.data)
  }

  dbReq.onerror = error => console.error(error)
  dbReq.onsuccess = event => {
    _DEBUG && console.log('dbReq.onsuccess', event)
    props.cb && props.cb(event.target.result)
  }
}

export const TransactionModel = {
  _db: null,
  _debug: (bool) => _DEBUG = bool,
  add: args => _baseTransaction(TRANSACTION_TYPES.ADD, args),
  delete: args => _baseTransaction(TRANSACTION_TYPES.DELETE, args),
  get: args => _baseTransaction(TRANSACTION_TYPES.GET, args),
  update: args => _baseTransaction(TRANSACTION_TYPES.UPDATE, args),
}