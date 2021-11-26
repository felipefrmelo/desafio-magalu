export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    super(message);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super("Route not found");
  }

  serializeErrors() {
    return [{ message: "Not found" }];
  }
}
