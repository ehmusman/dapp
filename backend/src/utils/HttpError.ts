export class HttpError extends Error {
    statusCode: number;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
  
      // Maintain proper stack trace (only in V8 engines)
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      }
    }
  }
  