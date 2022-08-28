import { mariaDb } from '../../network/resources/types/persistence/relational.ts'

import * as ReadUsers from './read/users.ts'

ReadUsers.Connect(mariaDb)
const getMembers = ReadUsers.getMembers

export const RelationalDB = {
  View: {
    Database: {
      getMembers
    },
  }
}