import { GraphDB } from '../../../persistence/graph/index.ts'

const GDBMS = GraphDB.View.Database

export const getBatchedTraits = async () => {
  const traits = await GDBMS.getTraits()
  return traits
}

export const GDBMS_View_Database = {
  getBatchedTraits
}