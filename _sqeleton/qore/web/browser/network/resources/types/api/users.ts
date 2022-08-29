import { Drash } from '../../../deps.ts';

import { RDBMS_API_Database } from '../../../../business/relational/_api/users.ts'
import { GDBMS_API_Database } from '../../../../business/graph/_api/users.ts'

export class ApiUsersResource extends Drash.Resource {
  public paths = [
    '/api/sql/v1/user/:uid',
    '/api/sql/v1/users',
    '/api/:dbtype/v1/users/:method',
  ];

  public async GET(request: Drash.Request, response: Drash.Response): Promise<void> {
    const dbtype = request.pathParam('dbtype')
    const mthd = request.pathParam('method')
    const uid = request.pathParam('uid')
    if(uid){
      const specifiedMember = await RDBMS_API_Database.getSpecifiedMember(uid)
      return response.json(specifiedMember)
    }
    if(!mthd){
      const allMembers = await RDBMS_API_Database.getAllMembers()
      return response.json(allMembers)
    }
    switch(mthd){
      // deno-lint-ignore no-case-declarations
      case 'guid-logic':
        const customLogicMember = await RDBMS_API_Database.customLogicToReturnSpecificGUID()
        return response.json(customLogicMember)
      // deno-lint-ignore no-fallthrough
      case 'explain-batch-traits':
        if(dbtype === 'graph') {
          const explainedBatchTraits = await GDBMS_API_Database.explainedBatchTraits()
          return response.json(explainedBatchTraits)
        }
      default:
        return response.json({mthd})
    }
  }

}
