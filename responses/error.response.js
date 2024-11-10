class ErrorResponse extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

class ConflictRequestError extends ErrorResponse {
  constructor(message = "Conflict error", statusCode = 409) {
    super(message, statusCode);
  }
}

class BadRequestError extends ErrorResponse {
  constructor(message = "Bad request error", statusCode = 400) {
    super(message, statusCode);
  }
}

class AuthFailureError extends ErrorResponse {
  constructor(message = "Auth failure error", statusCode = 401) {
    super(message, statusCode);
  }
}

class NotFoundError extends ErrorResponse {
  constructor(message = "Not found error", statusCode = 404) {
    super(message, statusCode);
  }
}

class ForbiddenError extends ErrorResponse {
  constructor(message = "Forbidden error", statusCode = 403) {
    super(message, statusCode);
  }
}

class UnauthorizedError extends ErrorResponse {
  constructor(message = "Unauthorized error", statusCode = 401) {
    super(message, statusCode);
  }
}

module.exports = {
  ConflictRequestError,
  BadRequestError,
  AuthFailureError,
  NotFoundError,
  ForbiddenError,
  UnauthorizedError,
};
