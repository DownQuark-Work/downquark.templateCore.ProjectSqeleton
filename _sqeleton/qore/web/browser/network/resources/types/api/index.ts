import { CSRFService, Drash } from '../../../deps.ts';
const csrf = new CSRFService(); // allows access to `csrf.token`

export class ApiResource extends Drash.Resource {
  public paths = ['/api/sql/v1/:service/:method.*',];
  public services = {
    POST: [csrf],
  }
}
