import { Drash } from '../../deps.ts';
import { CSRFService } from '../../deps.ts'

import { GDBMS_View_Database } from '../../../business/graph/_views/database.ts'
import { RDBMS_View_Database } from '../../../business/relational/_views/database.ts'
import { TSDBMS_View_Database } from '../../../business/timeseries/_views/database.ts'

 // TODO: move below to a higher level and remove dupes
const csrf = new CSRFService(); // allows access to `csrf.token`

export default class DatabaseResource extends Drash.Resource {
  public paths = [
    '/db/:databaseType',
  ];

  public services = {
    POST: [csrf],
  };

  public async GET(request: Drash.Request, response: Drash.Response): Promise<void> {
    const templateVariables = {
      graph:{renderedAt:0, userTraits:'grf'},
      relational:{renderedAt:0,databaseMember:'',databaseAllMembers:''},
      timeseries:{renderedAt:0,showFive:''},
    }
    const dbType = request.pathParam('databaseType')
      // RELATIONAL
    if(dbType === 'relational') {
      const specifiedMember = await RDBMS_View_Database.getSpecifiedMember('3af6e4f0-24a4-11ed-9cf0-c29d42d3cfc8')
      const allMembers = await RDBMS_View_Database.getAllMembers()
      templateVariables.relational = {
        renderedAt: Date.now(),
        databaseMember: `MariaDb Query: ${specifiedMember.username}`,
        databaseAllMembers: `MariaDb Query 2: ${JSON.stringify(allMembers)}`
      }
    }

    // GRAPH
    if(dbType === 'graph') {
      const usrTraits = await GDBMS_View_Database.getBatchedTraits()
      templateVariables.graph = {
        renderedAt: Date.now(),
        userTraits: `Graph Query: ${JSON.stringify(usrTraits)}`
      }
    }

    // TIMESERIES
    if(dbType === 'timeseries') {
      const fiveRecords = await TSDBMS_View_Database.getRecords()
      
      templateVariables.timeseries = {
        renderedAt: Date.now(),
        showFive: JSON.stringify(fiveRecords),
        }
      }

    if(dbType === 'bus') 
    {
      const busConfig = [
        [RDBMS_View_Database.getAllMembers,['3af6e4f0-24a4-11ed-9cf0-c29d42d3cfc8']],
        [GDBMS_View_Database.getBatchedTraits,],
        
        // TSDBMS_View_Database
      ]
      // 3 queries from above would return 3 indexes:
      /**
       * loadBus( - 5 subscripion advances, 5 returned values (void || undefined will be returned as null)
       *  [[RELATIONAL method1, [optional, props]]],
       *  [[GRAPH method1],[GRAPH method2, [optional, props]]],
       *  [[RELATIONAL method2], [GRAPHmethod1]],
       * ) => [
       *   {query: result, for: query[1]},
       *   {query: result, for: query[2]},
       *   null,
       *   'no formatting is done in the pubsub'
       *  ['handle, formats before hand when posssible.']
       * ]
       *  */ 
    }

    const html = response.render("../application/views/screens/database.html", templateVariables) as string;
    return response.html(html);
  }
}
