import joi from 'joi';

export const updateProfileSchema = {
  body: joi
    .object({
      firstName: joi.string().trim().min(2).max(25),
      lastName: joi.string().trim().min(2).max(25),
      email: joi.string().trim().lowercase().email()
    })
    .min(1)
};
