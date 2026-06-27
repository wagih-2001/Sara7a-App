import jwt from 'jsonwebtoken';
import { successResponse } from '../../Utils/response/success.response.js';
import { findById } from '../../DB/database.repository.js';
import UserModel from '../../DB/models/user.model.js';
import { NotFoundErrorException } from '../../Utils/response/error.response.js';
export const getProfile = async (req, res) => {
  // if (user.phone) user.phone = decrypt(user.phone);
  const { user } = req;
  successResponse({ res, statusCode: 200, data: { user } });
};
