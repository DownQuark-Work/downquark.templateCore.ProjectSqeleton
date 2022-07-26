import { mariaDb } from '../../network/resources/types/persistence/relational.ts'

import * as ReadUsers from './read/users.ts'

ReadUsers.Connect(mariaDb) // TODO: verify `Connect` is no longer needed
const getMembers = ReadUsers.getMembers

export const RelationalDB = {
  API: {
    v1: {
      Users: {
        getMembers
      }
    }
  },
  View: {
    Landing: {},
    Database: {
      getMembers
    },
  }
}