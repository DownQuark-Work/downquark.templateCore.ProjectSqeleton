import { TimeseriesDB } from '../../../persistence/timeseries/index.ts'
const TSDBMS = TimeseriesDB.View.Database

export const getRecords = async (recordAmt?:number) => {
  const records = await TSDBMS.getRandomRecords(recordAmt)
  return records
}

export const TSDBMS_View_Database = {
  getRecords
}