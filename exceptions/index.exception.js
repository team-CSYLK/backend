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
    this.status = status || 412;
    this.name = 'ValidationError';
  }
}

class DuplicateDBDataError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status || 409;
    this.name = 'DuplicateDBDataError';
  }
}

class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.name = 'Unauthorized';
  }
}

module.exports = {
  InvalidParamsError,
  ValidationError,
  DuplicateDBDataError,
  Unauthorized,
};
