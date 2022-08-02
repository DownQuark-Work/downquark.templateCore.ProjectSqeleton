import { Drash } from '../../deps.ts';
import { CSRFService } from '../../deps.ts'

import { InvalidReqParamsError } from '../types/error_handler.ts'
const csrf = new CSRFService(); // allows access to `csrf.token`

export default class LandingResource extends Drash.Resource {
  public paths = [
    '/',
  ];

  public services = {
    POST: [csrf],
  };

  public GET(request: Drash.Request, response: Drash.Response): void {
    const templateVariables = {landing:
      {
        renderedAt: Date.now(),
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