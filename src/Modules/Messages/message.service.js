import MessageModel from '../../DB/models/message.model.js';
import UserModel from '../../DB/models/user.model.js';

import { findById, create, findOne } from '../../DB/database.repository.js';

import { successResponse } from '../../Utils/response/success.response.js';

import { NotFoundErrorException } from '../../Utils/response/error.response.js';

// 1. Send Anonymous Message
export const sendAnonymousMessage = async (req, res) => {
  const { userId } = req.params;
  const { content } = req.body;

  // Check receiver
  const receiver = await findById({
    model: UserModel,
    id: userId
  });

  if (!receiver) {
    throw NotFoundErrorException('User Not Found');
  }

  // Create message
  const message = await create({
    model: MessageModel,
    data: {
      receiver: receiver._id,
      content
    }
  });

  return successResponse({
    res,
    statusCode: 201,
    message: 'Anonymous Message Sent Successfully',
    data: { message }
  });
};

// 2. Get Received Messages
export const getReceivedMessages = async (req, res) => {
  const messages = await MessageModel.find({
    receiver: req.user._id
  }).sort({ createdAt: -1 });

  return successResponse({
    res,
    statusCode: 200,
    message: 'Messages Retrieved Successfully',
    data: {
      count: messages.length,
      messages
    }
  });
};

// 3. Delete Message
export const deleteMessage = async (req, res) => {
  const { messageId } = req.params;

  const message = await MessageModel.findOneAndDelete({
    _id: messageId,
    receiver: req.user._id
  });

  if (!message) {
    throw NotFoundErrorException('Message Not Found');
  }

  return successResponse({
    res,
    statusCode: 200,
    message: 'Message Deleted Successfully',
    data: { message }
  });
};

// 4. Get Message Details
export const getMessageDetails = async (req, res) => {
  const { messageId } = req.params;

  const message = await findOne({
    model: MessageModel,
    filter: {
      _id: messageId,
      receiver: req.user._id
    }
  });

  if (!message) {
    throw NotFoundErrorException('Message Not Found');
  }

  return successResponse({
    res,
    statusCode: 200,
    message: 'Message Retrieved Successfully',
    data: { message }
  });
};
