import { successResponse } from '../../Utils/response/success.response.js';
import {
  BadRequestErrorException,
  NotFoundErrorException
} from '../../Utils/response/error.response.js';
import { findByIdAndUpdate } from '../../DB/database.repository.js';
import UserModel from '../../DB/models/user.model.js';
import { decrypt } from '../../Utils/security/encryption.security.js';

export const getProfile = async (req, res) => {
  const user = req.user.toJSON();

  if (user.phone) {
    user.phone = decrypt(user.phone);
  }

  return successResponse({
    res,
    statusCode: 200,
    message: 'Profile Retrieved Successfully',
    data: { user }
  });
};

export const uploadProfilePicture = async (req, res) => {
  if (!req.file) {
    throw BadRequestErrorException('Profile picture is required');
  }

  const user = await findByIdAndUpdate({
    model: UserModel,
    id: req.user._id,
    update: {
      profilepic: req.file.finalPath
    },
    options: { new: true }
  });

  if (!user) {
    throw NotFoundErrorException('User Not Found');
  }

  return successResponse({
    res,
    statusCode: 200,
    message: 'Profile Picture Uploaded Successfully',
    data: { user }
  });
};

export const uploadCoverPictures = async (req, res) => {
  if (!req.files?.length) {
    throw BadRequestErrorException('At least one cover picture is required');
  }

  const user = await findByIdAndUpdate({
    model: UserModel,
    id: req.user._id,
    update: {
      coverpic: req.files.map(file => file.finalPath)
    },
    options: { new: true }
  });

  if (!user) {
    throw NotFoundErrorException('User Not Found');
  }

  return successResponse({
    res,
    statusCode: 200,
    message: 'Cover Pictures Uploaded Successfully',
    data: { user }
  });
};
