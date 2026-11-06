import joi from 'joi';
import { GenderEnum } from '../../Utils/enums/user.enums.js';


// Email
export const emailField = joi
  .string()
  .trim()
  .lowercase()
  .email({
    minDomainSegments: 2,
    maxDomainSegments: 5,
    tlds: { allow: ['com', 'net', 'org'] }
  })
  .required()
  .messages({
    'string.email': 'Invalid email address',
    'string.empty': 'Email is required',
    'any.required': 'Email is required'
  });

// OTP
export const otpField = joi
  .string()
  .length(6)
  .pattern(/^\d{6}$/)
  .required()
  .messages({
    'string.length': 'OTP must be exactly 6 digits',
    'string.pattern.base': 'OTP must contain only numbers',
    'string.empty': 'OTP is required',
    'any.required': 'OTP is required'
  });

// Password
export const passwordField = joi
  .string()
  .min(8)
  .max(30)
  .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/)
  .required()
  .messages({
    'string.min': 'Password must be at least 8 characters',
    'string.max': 'Password must be at most 30 characters',
    'string.pattern.base':
      'Password must contain uppercase, lowercase and numbers',
    'string.empty': 'Password is required',
    'any.required': 'Password is required'
  });

// Confirm Password
export const confirmPasswordField = joi
  .string()
  .valid(joi.ref('password'))
  .required()
  .messages({
    'any.only': 'Passwords do not match',
    'string.empty': 'Confirm password is required',
    'any.required': 'Confirm password is required'
  });

// Signup Validation

export const signupSchema = {
  body: joi.object({
    firstName: joi
      .string()
      .trim()
      .min(2)
      .max(25)
      .pattern(/^[A-Za-z\u0600-\u06FF\s]+$/)
      .required()
      .messages({
        'any.required': 'First name is required',
        'string.empty': 'First name is required',
        'string.min': 'First name must be at least 2 characters',
        'string.max': 'First name must be at most 25 characters',
        'string.pattern.base': 'Invalid first name'
      }),

    lastName: joi
      .string()
      .trim()
      .min(2)
      .max(25)
      .pattern(/^[A-Za-z\u0600-\u06FF\s]+$/)
      .required()
      .messages({
        'any.required': 'Last name is required',
        'string.empty': 'Last name is required',
        'string.min': 'Last name must be at least 2 characters',
        'string.max': 'Last name must be at most 25 characters',
        'string.pattern.base': 'Invalid last name'
      }),

    email: emailField,

    password: joi
      .string()
      .min(8)
      .max(30)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/)
      .required()
      .messages({
        'string.min': 'Password must be at least 8 characters',
        'string.max': 'Password must be at most 30 characters',
        'string.pattern.base':
          'Password must contain uppercase, lowercase and numbers',
        'string.empty': 'Password is required',
        'any.required': 'Password is required'
      }),

    confirmPassword: confirmPasswordField,

    phone: joi
      .string()
      .trim()
      .pattern(/^(?:\+20|0020|0)?1[0125][0-9]{8}$/)
      .required()
      .messages({
        'string.pattern.base': 'Invalid Egyptian phone number',
        'string.empty': 'Phone is required',
        'any.required': 'Phone is required'
      }),

    gender: joi
      .number()
      .valid(...Object.values(GenderEnum))
      .optional(),

    DOB: joi.date().iso().max('now').optional()
  })
};

// Confirm Email Validation

export const confirmEmailSchema = {
  body: joi.object({
    email: emailField,
    otp: otpField
  })
};

// Login Validation

export const loginSchema = {
  body: joi.object({
    email: emailField,

    password: joi.string().required().messages({
      'string.empty': 'Password is required',
      'any.required': 'Password is required'
    })
  })
};

// Forget Password Validation

export const forgetPasswordSchema = {
  body: joi.object({
    email: emailField
  })
};

// Reset Password Validation

export const resetPasswordSchema = {
  body: joi.object({
    email: emailField,
    otp: otpField,
    password: passwordField,
    confirmPassword: confirmPasswordField
  })
};
