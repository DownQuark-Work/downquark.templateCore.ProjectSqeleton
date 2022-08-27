import { RelationalDB } from '../../../persistence/relational/index.ts'

const RDBMS = RelationalDB.View.Landing

const getSpecifiedMember = async (memberGuid:string) => {
  // do all logic related tasks here
  const specifiedMember = await RDBMS.getMembers('id', memberGuid)
  return specifiedMember
}

export const RDBMS_View_Landing = {
  getSpecifiedMember
}



const loadAllVisitorCounts = () => {
  return 'TODO: interact with the persistence layer to retrieve and group visitor data for POC'
}

const setVisitorInfo = () => {
  return 'TODO: interact with the persistence layer to add a count to the visitor IP, and upsert timestamp'
}

export const landing = {
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