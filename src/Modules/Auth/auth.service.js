import {
  BadRequestErrorException,
  ConflictErrorException,
  NotFoundErrorException,
  UnauthorizedErrorException,
  ForbiddenErrorException
} from '../../Utils/response/error.response.js';

import {
  compareHash,
  generateHash
} from '../../Utils/security/hash.security.js';
import { HashEnum } from '../../Utils/enums/security.enums.js';
import { decrypt, encrypt } from '../../Utils/security/encryption.security.js';

import {
  generateAndSendOTP,
  verifyOTP
} from '../../Utils/email/otp.service.js';

import { getNewLoginCredentials } from '../../Utils/tokens/token.js';
import { OTPEnum } from '../../Utils/enums/otp.enums.js';
import { findOne, create } from '../../DB/database.repository.js';
import UserModel from '../../DB/models/user.model.js';
import { successResponse } from '../../Utils/response/success.response.js';

export const signup = async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;

  // Check if user already exists
  const existingUser = await findOne({
    model: UserModel,
    filter: { email }
  });

  if (existingUser) {
    throw new ConflictErrorException('User already exists with this email');
  }
  // Hash Password
  const hashedPassword = await generateHash({
    plaintext: password,
    algorithm: HashEnum.Bycrpt
  });

  // Encrypt Phone Number
  const encryptedPhone = encrypt(phone);

  // Create User
  const user = await create({
    model: UserModel,
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone: encryptedPhone
    }
  });
  await generateAndSendOTP({
    user,
    type: OTPEnum.CONFIRM_EMAIL
  });

  // Response
  return successResponse({
    res,
    statusCode: 201,
    message:
      'User created successfully. Please check your email to confirm your account.',
    data: { user }
  });
};

export const confirmEmail = async (req, res) => {
  const { email, otp } = req.body;

  const user = await findOne({
    model: UserModel,
    filter: { email }
  });

  if (!user) {
    throw NotFoundErrorException('User Not Found');
  }

  if (user.confirmEmail) {
    throw ConflictErrorException('Email Already Confirmed');
  }

  const verifiedUser = await verifyOTP({
    userId: user._id,
    otp,
    type: OTPEnum.CONFIRM_EMAIL
  });

  verifiedUser.confirmEmail = new Date();
  await verifiedUser.save();

  return successResponse({
    res,
    statusCode: 200,
    message: 'Email Confirmed Successfully',
    data: { user: verifiedUser }
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await findOne({
    model: UserModel,
    filter: { email },
    select: 'firstName lastName email password phone role provider confirmEmail'
  });

  if (!user) {
    throw UnauthorizedErrorException('Invalid Email Or Password');
  }

  if (user.provider !== 0) {
    throw BadRequestErrorException('Please Login Using Your Social Provider');
  }

  const isMatch = await compareHash({
    plaintext: password,
    ciphertext: user.password,
    algorithm: HashEnum.Bycrpt
  });

  if (!isMatch) {
    throw UnauthorizedErrorException('Invalid Email Or Password');
  }

  if (!user.confirmEmail) {
    throw ForbiddenErrorException('Please Confirm Your Email First');
  }

  if (user.phone) {
    user.phone = decrypt(user.phone);
  }

  const tokens = await getNewLoginCredentials(user);

  return successResponse({
    res,
    statusCode: 200,
    message: 'Login Successfully',
    data: { tokens }
  });
};

export const forgetPassword = async (req, res) => {
  const { email } = req.body;

  const user = await findOne({
    model: UserModel,
    filter: { email, provider: 0 }
  });

  if (!user) {
    throw NotFoundErrorException('User Not Found');
  }

  if (!user.confirmEmail) {
    throw ForbiddenErrorException('Please Confirm Your Email First');
  }

  await generateAndSendOTP({
    user,
    type: OTPEnum.FORGET_PASSWORD
  });

  return successResponse({
    res,
    statusCode: 200,
    message: 'Password Reset OTP Sent Successfully'
  });
};

export const resetPassword = async (req, res) => {
  const { email, otp, password } = req.body;

  const user = await findOne({
    model: UserModel,
    filter: { email, provider: 0 }
  });

  if (!user) {
    throw NotFoundErrorException('User Not Found');
  }

  if (!user.confirmEmail) {
    throw ForbiddenErrorException('Please Confirm Your Email First');
  }

  const verifiedUser = await verifyOTP({
    userId: user._id,
    otp,
    type: OTPEnum.FORGET_PASSWORD
  });

  const hashedPassword = await generateHash({
    plaintext: password,
    algorithm: HashEnum.Bycrpt
  });

  verifiedUser.password = hashedPassword;
  await verifiedUser.save();

  return successResponse({
    res,
    statusCode: 200,
    message: 'Password Reset Successfully'
  });
};
