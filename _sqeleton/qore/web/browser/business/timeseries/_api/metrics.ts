import { TimeseriesDB } from '../../../persistence/timeseries/index.ts'
import { getRecords } from '../_views/database.ts'

const TSDBMS = TimeseriesDB.API.v1.Metrics

const customLogicToReturnTwentyResults = async () => {
  const allMembers = await TSDBMS.getRandomRecords(20)
  return allMembers
}

export const TSDBMS_API_Database = {
  customLogicToReturnTwentyResults,
  getRecords
}