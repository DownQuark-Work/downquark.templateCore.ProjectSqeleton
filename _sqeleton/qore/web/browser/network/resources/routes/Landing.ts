import { Drash } from '../../deps.ts';
import { CSRFService } from '../../deps.ts'
import { InvalidReqParamsError } from '../types/error_handler.ts'

import { Graph as LandingGraphQuery } from '../../../business/graph/query.ts'
import { Graph as LandingGraphRead } from '../../../business/graph/read.ts'
import { Relational as RelationalGraphQuery } from '../../../business/relational/query.ts'
import { Relational as RelationalGraphRead } from '../../../business/relational/read.ts'
import { TimeSeries as TimeSeriesGraphQuery } from '../../../business/timeseries/query.ts'
import { TimeSeries as TimeSeriesGraphRead } from '../../../business/timeseries/read.ts'

const csrf = new CSRFService(); // allows access to `csrf.token`

export default class LandingResource extends Drash.Resource {
  public paths = [
    '/',
  ];

  public services = {
    POST: [csrf],
  };

  public GET(request: Drash.Request, response: Drash.Response): void {

    // database interaction stubs
    // LandingGraphQuery.Landing.GET.setReferrer()
    // LandingGraphRead.Landing.GET.init()
    // RelationalGraphQuery.Landing.GET.setVisitorInfo()
    // RelationalGraphRead.Landing.GET.init()
    // TimeSeriesGraphQuery.Landing.GET.qryTime()
    // TimeSeriesGraphRead.Landing.GET.init()

    const templateVariables = {landing:
      {
        renderedAt: Date.now(),
        landingGraphQuery: LandingGraphQuery.Landing.GET.setReferrer(),
        landingGraphRead: LandingGraphRead.Landing.GET.init(),
        relationalGraphQuery: RelationalGraphQuery.Landing.GET.setVisitorInfo(),
        relationalGraphRead: RelationalGraphRead.Landing.GET.init(),
        timeSeriesGraphQuery: TimeSeriesGraphQuery.Landing.GET.qryTime(),
        timeSeriesGraphRead: TimeSeriesGraphRead.Landing.GET.init(),
        nestedPageName: { // example of `/landing/nested-page-name/`
          nestedPageKey: 'nested page value'
        }
      }
    }

    const html = response.render("../application/views/screens/landing.html", templateVariables) as string;
    return response.html(html);
  }

  public POST(request: Drash.Request, response: Drash.Response): void {
    const token = request.headers.get("X-CSRF-TOKEN");
    // or get the token from the cookie if it is set there
    //     const token = request.getCookie("X-CSRF-TOKEN");

    if (!token) {
      console.log(`CSRF token is not set - this woud error in a real instance`)
    }
    return response.json({ hello: 'POST' });
  }

  public PUT(request: Drash.Request, response: Drash.Response): void {
    return response.json({ hello: 'PUT' });
  }

  public DELETE(request: Drash.Request, response: Drash.Response): void {
    return response.json({ hello: 'DELETE' });
  }
}