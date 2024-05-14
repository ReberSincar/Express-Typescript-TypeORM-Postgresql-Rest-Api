export class ApiError extends Error {
  code: number;
  message: string;
  error: Error;

  constructor(code: number, message: string, error: Error) {
    super(message);
    this.code = code;
    this.message = message;
    this.error = error;
  }
}

export const badRequest = (message: string = "Bad Request", error?: Error) => {
  throw new ApiError(400, message, error);
};

export const unauthorized = (
  message: string = "Unauthorized",
  error?: Error
) => {
  throw new ApiError(401, message ? message : error.message, error);
};

export const forbidden = (message: string = "Forbidden", error?: Error) => {
  throw new ApiError(403, message ? message : error.message, error);
};

export const notFound = (message: string = "Not Found", error?: Error) => {
  throw new ApiError(404, message ? message : error?.message, error);
};

export const unprocessableEntity = (
  message: string = "Unprocessable Entity",
  error?: Error
) => {
  throw new ApiError(422, message ? message : error.message, error);
};

export const notAcceptable = (
  message: string = "Not Acceptable",
  error?: Error
) => {
  throw new ApiError(406, message ? message : error.message, error);
};

export const internalError = (error: Error) => {
  throw new ApiError(500, "Internal Server Error", error);
};
