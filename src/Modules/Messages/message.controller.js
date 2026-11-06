import { Router } from 'express';

import {
  sendAnonymousMessage,
  getReceivedMessages,
  deleteMessage,
  getMessageDetails
} from './message.service.js';

import {
  sendMessageSchema,
  getMessageSchema,
  deleteMessageSchema
} from './message.validation.js';

import { validation } from '../../Middlewares/validation.middleware.js';
import { authentication } from '../../Middlewares/authentication.middleware.js';

const router = Router();

// Send Anonymous Message
router.post(
  '/send/:userId',
  validation(sendMessageSchema),
  sendAnonymousMessage
);

// Get Received Messages
router.get('/received', authentication(), getReceivedMessages);

// Delete Message
router.delete(
  '/:messageId',
  authentication(),
  validation(deleteMessageSchema),
  deleteMessage
);

// Get Message Details
router.get(
  '/:messageId',
  authentication(),
  validation(getMessageSchema),
  getMessageDetails
);

export default router;
