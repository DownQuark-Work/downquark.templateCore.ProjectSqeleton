import { Drash } from '../../deps.ts';
import { CSRFService } from '../../deps.ts'

import { RDBMS_View_Database } from '../../../business/relational/_views/database.ts'
import { TSDBMS_View_Database } from '../../../business/timeseries/_views/database.ts'

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

    // TIMESERIES
    if(dbType === 'timeseries') {
      const fiveRecords = await TSDBMS_View_Database.getRecords()
      
      templateVariables.timeseries = {
        renderedAt: Date.now(),
        showFive: JSON.stringify(fiveRecords),
        }
      }

    const html = response.render("../application/views/screens/database.html", templateVariables) as string;
    return response.html(html);
  }
}
