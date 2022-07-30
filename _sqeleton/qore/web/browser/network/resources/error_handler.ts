import { Drash } from '../deps.ts';

// Create your custom error. This MUST be an extension of Error.
export class InvalidReqParamsError extends Error {
  // It is a good idea to associate the HTTP status code in your custom error
  // so you can retrieve it as `error.code` in your error handler class
  public code = 400;

  constructor(message?: string) {
    // Use the message provided or default to a generic error message
    super(message ?? "Invalid request params received.");
  }
}

export class InvalidPOSTReqParamsError extends Error {
  public code = 400;
  constructor(message?: string) {
    super(message ?? "Invalid request params received in SERVICE on POST");
  }
}

// Create your error handler to send JSON responses instead of Drash sending
// an error with a stack trace
export class DqErrorHandler extends Drash.ErrorHandler {
  public catch(
    error: Error,
    request: Request,
    response: Drash.Response,
  ): void {
    // Default to 500
    let code = 500;
    let message = "Server failed to process the request. Please try again later.";
    
    // Handle all built-in Drash errors
    if (error instanceof Drash.Errors.HttpError) {
      response.status = error.code;
      return response.json({
        message: error.message,
      });
    }

    // If this was a bad request, then return 400
    if (error instanceof InvalidReqParamsError){
      code = 400;
      message = "Invalid request params/body received.";
    }

    // If the error is not of type Drash.Errors.HttpError, then default to a
    // HTTP 500 error response. This is useful if you cannot ensure that
    // third-party dependencies (e.g., some database dependency) will throw
    // an error object that can be converted to an HTTP response.
    response.status = 500;
    return response.json({
      message
    });
  }
}
