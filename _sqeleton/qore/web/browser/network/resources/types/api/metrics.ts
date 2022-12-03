import { Drash } from '../../../deps.ts';

import { TSDBMS_API_Database } from '../../../../business/timeseries/_api/metrics.ts'

export class ApiMetricsResource extends Drash.Resource {
  public paths = [
    '/api/sql/v1/metrics',
    '/api/sql/v1/metrics/:amt',
  ];

  public async GET(request: Drash.Request, response: Drash.Response): Promise<void> {
    const amt = request.pathParam('amt')
    const customTwenty = request.queryParam('custom')
    
    if(amt){
      const specifiedRecords = await TSDBMS_API_Database.getRecords(parseInt(amt,10))
      return response.json(specifiedRecords)
    }
    if(customTwenty){
      const cstm = await TSDBMS_API_Database.customLogicToReturnTwentyResults()
      return response.json(cstm)
    }
    const defaultRecords = await TSDBMS_API_Database.getRecords()
      return response.json(defaultRecords)
  }
}