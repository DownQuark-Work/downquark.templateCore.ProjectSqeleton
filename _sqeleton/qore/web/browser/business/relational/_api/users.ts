import { RelationalDB } from '../../../persistence/relational/index.ts'
import { getAllMembers } from '../_views/database.ts'

const RDBMS = RelationalDB.View.Database

const customLogicToReturnSpecificGUID = async () => {
  const allMembers = await RDBMS.getMembers('username','downquark')
  return allMembers
}

const getSpecifiedMember = async (memberGuid:string) => {
  // do all logic related tasks here
  const specifiedMember = await RDBMS.getMembers('id', memberGuid)
  return specifiedMember
}

export const RDBMS_API_Database = {
  customLogicToReturnSpecificGUID,
  getAllMembers,
  getSpecifiedMember,
}