const {
  BadRequestError, Unauthorized, Forbidden, PreconditionFailed, NotFound, InternalServerError, InvalidParamsError, ValidationError
} = require('../helper/http.exception.helper');

//* Error Handling Middleware
module.exports = ((err, req, res, next) => {
  if (err instanceof BadRequestError) return res.status(400).json({ errorMessage: err.message });
  if (err instanceof Unauthorized) return res.status(401).json({ errorMessage: err.message });
  if (err instanceof Forbidden) return res.status(403).json({ errorMessage: err.message });
  if (err instanceof PreconditionFailed) return res.status(412).json({ errorMessage: err.message });
  if (err instanceof NotFound) return res.status(404).json({ errorMessage: err.message });
  if (err instanceof InternalServerError) {
    return res.status(500).json({ errorMessage: err.message });
  }
  if (err instanceof InvalidParamsError) return res.status(409).json({ errorMessage: err.message });
  if (err instanceof ValidationError) return res.status(409).json({ errorMessage: err.message });
  next();
});
