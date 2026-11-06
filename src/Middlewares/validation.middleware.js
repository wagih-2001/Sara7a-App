import { BadRequestErrorException } from '../Utils/response/error.response.js';

export const validation = schema => {
  return (req, res, next) => {
    const validationError = [];

    for (const key of Object.keys(schema)) {
      const { error, value } = schema[key].validate(req[key], {
        abortEarly: false,
        allowUnknown: false
      });

      if (error) {
        validationError.push({
          key,
          details: error.details.map(error => ({
            message: error.message,
            path: error.path,
            type: error.type
          }))
        });
      } else {
        req[key] = value;
      }
    }

    if (validationError.length) {
      throw BadRequestErrorException('ValidationError', validationError);
    }

    return next();
  };
};
