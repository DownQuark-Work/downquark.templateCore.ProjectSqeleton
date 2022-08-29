import { GraphDB } from '../../../persistence/graph/index.ts'

const GDBMS = GraphDB.API.v1.Users

const explainedBatchTraits = async () => {
  const explainBatch = await GDBMS.explainBatchTraits()
  return explainBatch
}

export const GDBMS_API_Database = {
  explainedBatchTraits,
}