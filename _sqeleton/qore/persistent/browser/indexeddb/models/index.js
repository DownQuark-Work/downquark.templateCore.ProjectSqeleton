// db handling can also definitely be improved in final version
import { ObjectStoreModel } from './objectstore.js'
import { TransactionModel } from './trxn.js'

export const Models = {
  _db: db => {
    ObjectStoreModel._db = db
    TransactionModel._db = db
  },
  ObjectStore: ObjectStoreModel,
  Transaction: TransactionModel,
}