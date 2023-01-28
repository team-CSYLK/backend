//* 400
class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
  }
}
//* 401
class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.name = 'Unauthorized';
  }
}
//* 403
class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.name = 'Forbidden';
  }
}
//* 404
class NotFound extends Error {
  constructor(message) {
    super(message);
    this.name = 'Forbidden';
  }
}
//* 409
class InvalidParamsError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 409;
    this.name = 'InvalidParamsError';
    if (!message) this.message = '요청한 데이터 형식이 올바르지 않습니다.';
  }
}

class ValidationError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 409;
    this.name = 'ValidationError';
  }
}

//* 412
class PreconditionFailed extends Error {
  constructor(message) {
    super(message);
    this.name = 'PreconditionFailed';
  }
}
//* 500
class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InternalServerError';
  }
}

module.exports = {
  BadRequestError, Unauthorized, Forbidden, NotFound, PreconditionFailed, InternalServerError,InvalidParamsError, ValidationError
};
