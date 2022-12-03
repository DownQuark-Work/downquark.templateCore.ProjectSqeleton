import { TimeseriesFetch } from '../../../network/resources/types/persistence/timeseries.ts'

const getLong = async (recordAmt = 5) => {
  const query = `SELECT x FROM long_sequence(${recordAmt});`
  const result = await TimeseriesFetch(query)
  return result
}
export {
  getLong
}