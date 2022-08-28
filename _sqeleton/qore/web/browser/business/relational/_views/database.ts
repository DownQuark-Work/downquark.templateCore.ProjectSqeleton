import { RelationalDB } from '../../../persistence/relational/index.ts'

const RDBMS = RelationalDB.View.Database

const getSpecifiedMember = async (memberGuid:string) => {
  // do all logic related tasks here
  const specifiedMember = await RDBMS.getMembers('id', memberGuid)
  return specifiedMember
}

export const RDBMS_View_Database = {
  getSpecifiedMember
}



const loadAllVisitorCounts = () => {
  return 'TODO: interact with the persistence layer to retrieve and group visitor data for POC'
}

const setVisitorInfo = () => {
  return 'TODO: interact with the persistence layer to add a count to the visitor IP, and upsert timestamp'
}

export const database = {
  RDBMS: {
    Query: {
      GET: {
        setVisitorInfo
      },
    },
    Read: {
      GET: {
        init: loadAllVisitorCounts
      }
    }
  }
}