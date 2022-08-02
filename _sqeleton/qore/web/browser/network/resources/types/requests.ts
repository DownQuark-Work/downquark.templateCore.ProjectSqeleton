import { Drash } from "../../deps.ts";

export class BodyParsingResource extends Drash.Resource {
  public paths = [];
  public POST(request: Drash.Request, response: Drash.Response): void {
    const parseType = request.bodyParam('type')
    const qookieValue = request.getCookie("qookie");

    if (qookieValue) {
      console.log('qookieValue', qookieValue)
    }

    if(parseType === 'multipartform') {
      const file = request.bodyParam<Drash.Types.BodyFile>("file"); // "file" being the `name` of the input element
      const name = request.bodyParam<string>("name");
      console.log("Got name and file!", file, name);
      if (!file) {
        throw new Error("File is required!");
      }
      return Deno.writeFileSync(`_public/${file.filename}`, file.content);
    }

    const param = request.bodyParam("name");
    // No param passed in? Get out.
    if (!param) { throw new Drash.Errors.HttpError( 400, "This resource requires the `name` body param.",) }
    return response.text(`You passed in the following body param: ${param} as ${parseType} data`);
  }

  // used for multipart form updates
  public GET(request: Drash.Request, response: Drash.Response): void {
    console.log('request.queryParam("name")', request.queryParam("q"))
    return response.html(
      `<!DOCTYPE html>
        <html>
            <head></head>
            <body>
                <form action="/bodyparse" method="post" enctype="multipart/form-data">
                    <input type="file" name="file" />
                    <input name="name" type="text" />
                    <input name="type" value="multipartform" type="hidden" />
                    <button type="submit">submit</button>
                </form>
            </body>
        </html>`,
    );
  }
}