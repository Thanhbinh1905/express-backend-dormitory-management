// responses/success.response.js

class SuccessResponse {
  constructor({
    message,
    statusCode = 200,
    reasonStatusCode = "OK",
    metadata = {},
  }) {
    this.message = !message ? reasonStatusCode : message;
    this.status = statusCode;
    this.metadata = metadata;
  }

  send(res) {
    return res.status(this.status).json(this);
  }
}

class OkResponse extends SuccessResponse {
  constructor({ message, metadata }) {
    super({ message, metadata });
  }
}

class CreatedResponse extends SuccessResponse {
  constructor({ message, metadata }) {
    super({ message, statusCode: 201, reasonStatusCode: "Created", metadata });
  }
}

class NotFoundResponse extends SuccessResponse {
  constructor({ message, metadata }) {
    super({
      message,
      statusCode: 202,
      reasonStatusCode: "Not In Room",
      metadata,
    });
  }
}

module.exports = {
  OkResponse,
  CreatedResponse,
  SuccessResponse,
  NotFoundResponse,
};
