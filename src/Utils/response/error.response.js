export const ErrorResponse = ({
  message = ' Error',
  statusCode = 500,
  extra = undefined
}) => {
  const error = new Error(
    typeof message === 'string' ? message : message?.message
  );
  error.statusCode = statusCode;
  error.extra = extra;
  throw error;
};

export const NotFoundErrorException = (
  message = 'Not Found Error Exception',
  extra
) => {
  return ErrorResponse({ message, statusCode: 404, extra });
};

export const BadRequestErrorException = (
  message = 'Bad Request Error Exception',
  extra
) => {
  return ErrorResponse({ message, statusCode: 400, extra });
};

export const UnauthorizedErrorException = (
  message = 'Unauthorized Error Exception',
  extra
) => {
  return ErrorResponse({ message, statusCode: 401, extra });
};

export const ForbiddenErrorException = (
  message = 'Forbidden Error Exception',
  extra
) => {
  return ErrorResponse({ message, statusCode: 403, extra });
};

export const InternalServerErrorException = (
  message = 'Internal Server Error Exception',
  extra
) => {
  return ErrorResponse({ message, statusCode: 500, extra });
};

export const ValidationErrorException = (
  message = 'Validation Error Exception',
  extra
) => {
  return ErrorResponse({ message, statusCode: 422, extra });
};

export const ConflictErrorException = (
  message = 'Conflict Error Exception',
  extra
) => {
  return ErrorResponse({ message, statusCode: 409, extra });
};

export const TooManyRequestsErrorException = (
  message = 'Too Many Requests Error Exception',
  extra
) => {
  return ErrorResponse({ message, statusCode: 429, extra });
};

export const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    message: err.message || 'An unexpected error occurred.',
    stack: err.stack || null,
    extra: err.extra || undefined,
    status: statusCode || 500
  });
};
