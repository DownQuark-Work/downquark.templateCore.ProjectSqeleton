import { RelationalDB } from '../../../persistence/relational/index.ts'

const RDBMS = RelationalDB.View.Database

const getAllMembers = async () => {
  const allMembers = await RDBMS.getMembers()
  return allMembers
}

const getSpecifiedMember = async (memberGuid:string) => {
  // do all logic related tasks here
  const specifiedMember = await RDBMS.getMembers('id', memberGuid)
  return specifiedMember
}

export const RDBMS_View_Database = {
  getAllMembers,
  getSpecifiedMember
}
