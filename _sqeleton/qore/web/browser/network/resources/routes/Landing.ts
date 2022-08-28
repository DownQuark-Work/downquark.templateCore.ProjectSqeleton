import { Drash } from '../../deps.ts';
import { CSRFService, Client, WebSocketClient } from '../../deps.ts'
import { InvalidReqParamsError } from '../types/error_handler.ts'

const csrf = new CSRFService(); // allows access to `csrf.token`

export default class LandingResource extends Drash.Resource {
  public paths = [
    '/',
  ];

  public services = {
    POST: [csrf],
  };

  public GET(_request: Drash.Request, response: Drash.Response): void {
    
    // TODO: MOVE this to its own page for demo
    // to launch the websocket you must first start the browser server - wait for it to fully initiate (use process_output.txt to verify),
    // then start the websocket server
    // only then can you go to the browser and navigate around
    /* Enable below when ready for ws integration:
      // better: move this into the websocket resouce. How databases are being handled
    const websocketClientFromBrowserNetwork = new WebSocketClient('ws://localhost:1447/websocket');
    websocketClientFromBrowserNetwork.on("landingsocket", (e) => {
      console.log('landingsocket websocketClientFromBrowserNetwork guid is:', e) // TODO: set this and reutilize
      websocketClientFromBrowserNetwork.to("exposeguid", "retrieve said guid: " + e.message);
    });
    */

    const templateVariables = {landing:
      {
        renderedAt: Date.now(),
        randomNum: Math.random(),
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