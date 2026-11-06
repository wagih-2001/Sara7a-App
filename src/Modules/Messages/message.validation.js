import joi from 'joi';

const objectIdField = joi.string().hex().length(24).required().messages({
  'string.hex': 'Invalid ID format',
  'string.length': 'ID must be 24 characters',
  'any.required': 'ID is required'
});

export const sendMessageSchema = {
  params: joi.object({
    userId: objectIdField
  }),

  body: joi.object({
    content: joi.string().trim().min(1).max(1000).required().messages({
      'string.empty': 'Message content is required',
      'string.min': 'Message cannot be empty',
      'string.max': 'Message cannot exceed 1000 characters',
      'any.required': 'Message content is required'
    })
  })
};

export const getMessageSchema = {
  params: joi.object({
    messageId: objectIdField
  })
};

export const deleteMessageSchema = {
  params: joi.object({
    messageId: objectIdField
  })
};
