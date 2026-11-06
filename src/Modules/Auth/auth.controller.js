import { Router } from 'express';
import * as authService from './auth.service.js';

import { validation } from '../../Middlewares/validation.middleware.js';

import {
  signupSchema,
  confirmEmailSchema,
  loginSchema,
  forgetPasswordSchema,
  resetPasswordSchema
} from './auth.validation.js';

const router = Router();

router.post('/signup', validation(signupSchema), authService.signup);

router.post(
  '/confirm-email',
  validation(confirmEmailSchema),
  authService.confirmEmail
);

router.post('/login', validation(loginSchema), authService.login);

router.post(
  '/forget-password',
  validation(forgetPasswordSchema),
  authService.forgetPassword
);

router.post(
  '/reset-password',
  validation(resetPasswordSchema),
  authService.resetPassword
);

export default router;
