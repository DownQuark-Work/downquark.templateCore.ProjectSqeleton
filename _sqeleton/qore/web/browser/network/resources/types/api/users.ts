import { Drash } from '../../../deps.ts';

import { RDBMS_API_Database } from '../../../../business/relational/_api/users.ts'

export class ApiUsersResource extends Drash.Resource {
  public paths = [
    '/api/sql/v1/user/:uid',
    '/api/sql/v1/users',
    '/api/sql/v1/users/:method',
  ];

  public async GET(request: Drash.Request, response: Drash.Response): Promise<void> {
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
      default:
        return response.json({mthd})
    }
    // const specifiedMember = await RDBMS_API_Database.getSpecifiedMember('ed62d20a-249c-11ed-9cf0-c29d42d3cfc8')
    // const allMembers = await RDBMS_API_Database.getAllMembers()
  }

}
