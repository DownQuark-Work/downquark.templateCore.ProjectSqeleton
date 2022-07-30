import { Drash } from '../deps.ts';
import { CSRFService } from '../deps.ts'
import { InvalidReqParamsError } from './error_handler.ts'

const csrf = new CSRFService(); // allows access to `csrf.token`

export default class LandingResource extends Drash.Resource {
  public paths = [
    '/',
  ];

   // Tell the resource what HTTP methods should have CSRF protection. In this
  // case, we are telling the resource to protect the POST method. This means
  // the POST method will require the CSRF token.
  public services = {
    POST: [csrf],
  };

  public GET(request: Drash.Request, response: Drash.Response): void {
    // Set the token on the response headers
    response.headers.set("X-CSRF-TOKEN", csrf.token);
    // or set it in a cookie like so:
    //
    //     response.setCookie({
    //       name: "X-CSRF-TOKEN",
    //       value: csrf.token,
    //     });


    if(request.queryParam('redir')) { // redirect example
      this.redirect(
        'https://downquark.work',
        response,
        301,
        { "X-DOWNQUARK-HEADER": "dq.work", },
        )
    }
    const templateVariables = {tmplt: {renderedAt: Date.now(), }}
    const html = response.render("/views/screens/landing.html", templateVariables) as string;
    return response.html(html);
  }

  public POST(request: Drash.Request, response: Drash.Response): void {
    const token = request.headers.get("X-CSRF-TOKEN");
    // or get the token from the cookie if it is set there
    //
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