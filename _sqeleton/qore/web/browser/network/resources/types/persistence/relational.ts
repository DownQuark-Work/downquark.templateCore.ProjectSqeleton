import { MariaDb } from "../../../deps.ts";

export const mariaDb = await new MariaDb().connect({
  hostname: "127.0.0.1",
  port: 3366,
  db: "dq.relational",
  username: "root",
  password: "root",
});

// export class PersistRelationalResource extends Drash.Resource {
//   public paths = ['/api/sql/v1',];

//   public async GET(_request: Drash.Request, response: Drash.Response): Promise<void> {
//     const qry = await mariaDb.execute('SELECT username FROM member')
//     const qryResult = {...qry, _USAGE: 'As endpoints available for an API:'}
//     return response.json(qryResult)
//   }
// }