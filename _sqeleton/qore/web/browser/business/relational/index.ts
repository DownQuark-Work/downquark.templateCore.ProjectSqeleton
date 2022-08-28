import { database } from './_views/database.ts'

export const Relational = {
  Database: {
    Read: database.RDBMS.Read,
    Query: database.RDBMS.Query,
  }
}