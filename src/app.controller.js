import connectDB from './DB/connection.js';
import { authRouter, userRouter, messageRouter } from './Modules/index.js';
import {
  globalErrorHandler,
  NotFoundErrorException
} from './Utils/response/error.response.js';
import { successResponse } from './Utils/response/success.response.js';
import path from 'node:path';
import { rateLimit } from 'express-rate-limit';
import { corsOptions } from './Utils/core/core.js';
import cors from 'cors';

const bootstrap = async (app, express) => {
  const loginRateLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    limit: 3, // Maximum 3 requests
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
      message: 'Too many login attempts. Please try again after one minute.'
    }
  });

  app.use(express.json());
  app.use(loginRateLimiter, cors(corsOptions));

  await connectDB();

  app.get('/', (req, res) => {
    successResponse({ res, statusCode: 200, message: 'Welcome to the API!' });
  });
  app.use('/uploads', express.static(path.resolve('./src/uploads')));
  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/user', userRouter);
  app.use('/api/v1/messages', messageRouter);

  app.all('/*dummy', (req, res, next) => {
    throw NotFoundErrorException(' not found this route handler');
  });
  app.use(globalErrorHandler);
};
export default bootstrap;
