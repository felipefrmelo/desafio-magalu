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

export type FieldError = {
  msg: string;
  field: string;
};

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public errors: FieldError[]) {
    super("Invalid request parameters");
  }

  serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.field };
    });
  }
}
