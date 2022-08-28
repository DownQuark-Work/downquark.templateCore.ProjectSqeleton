import { Drash } from '../../deps.ts';
import { CSRFService } from '../../deps.ts'

import { RDBMS_View_Database } from '../../../business/relational/_views/database.ts'

const csrf = new CSRFService(); // allows access to `csrf.token`

export default class DatabaseResource extends Drash.Resource {
  public paths = [
    '/db/relational',
  ];

  public services = {
    POST: [csrf],
  };

  public async GET(_request: Drash.Request, response: Drash.Response): Promise<void> {
  
    const specifiedMember = await RDBMS_View_Database.getSpecifiedMember('3af6e4f0-24a4-11ed-9cf0-c29d42d3cfc8')
    const allMembers = await RDBMS_View_Database.getAllMembers()
    const templateVariables = {relational:
      {
        renderedAt: Date.now(),
        databaseMember: `MariaDb Query: ${specifiedMember.username}`,
        databaseAllMembers: `MariaDb Query 2: ${JSON.stringify(allMembers)}`
      }
    }

    const html = response.render("../application/views/screens/database.html", templateVariables) as string;
    return response.html(html);
  }
}
