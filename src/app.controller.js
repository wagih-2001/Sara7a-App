import { authRouter, userRouter, messageRouter } from './Modules/index.js';
import {
  globalErrorHandler,
  NotFoundErrorException
} from './Utils/response/error.response.js';
import { successResponse } from './Utils/response/success.response.js';

const bootstrap = async (app, express) => {
  app.use(express.json());

  app.get('/', (req, res) => {
    successResponse({ res, statusCode: 200, message: 'Welcome to the API!' });
  });

  app.use('/api/v1/auth', authRouter);
  app.use('/api/v1/users', userRouter);
  app.use('/api/v1/messages', messageRouter);

  app.all('/*dummy', (req, res) => {
    NotFoundErrorException(" not found this route handler");
  });
  app.use(globalErrorHandler);
};
export default bootstrap;
