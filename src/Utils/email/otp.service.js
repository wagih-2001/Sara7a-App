import {
  generateOTP,
  hashOTP,
  compareOTPHash
} from '../security/otp.security.js';
import { OTPEnum } from '../enums/otp.enums.js';
import UserModel from '../../DB/models/user.model.js';
import { emailEvents } from '../event/email.event.js';
import { BadRequestErrorException } from '../../Utils/response/error.response.js';

const OTP_EXPIRES_IN = 10 * 60 * 1000;
const MAX_OTP_ATTEMPTS = 5;

// Generate OTP, Hash it, Save it and Send Email
export const generateAndSendOTP = async ({ user, type }) => {
  if (!Object.values(OTPEnum).includes(type)) {
    throw new BadRequestErrorException('Invalid OTP Type');
  }

  const otp = generateOTP();
  const hashedOTP = await hashOTP(otp);
  const expiresIn = new Date(Date.now() + OTP_EXPIRES_IN);

  // Remove previous OTP with the same type
  user.otp = user.otp.filter(item => item.type !== type);

  // Add new OTP
  user.otp.push({
    code: hashedOTP,
    type,
    expiresIn,
    attempts: 0
  });

  await user.save();
  // Send OTP Email
  emailEvents.emit(type, {
    to: user.email,
    otp,
    username: user.username
  });

  return true;
};

// Verify OTP
export const verifyOTP = async ({ userId, otp, type }) => {
  const user = await UserModel.findById(userId).select('+otp.code');
  if (!user) {
    throw new BadRequestErrorException('User Not Found');
  }
  const userOTP = user.otp.find(item => item.type === type);
  if (!userOTP) {
    throw new BadRequestErrorException('OTP Not Found');
  }

  // Check Expiration
  if (userOTP.expiresIn.getTime() < Date.now()) {
    user.otp = user.otp.filter(item => item.type !== type);
    await user.save();
    throw new BadRequestErrorException('OTP Expired');
  }

  // Check Maximum Attempts
  if (userOTP.attempts >= MAX_OTP_ATTEMPTS) {
    user.otp = user.otp.filter(item => item.type !== type);
    await user.save();
    throw new BadRequestErrorException('Maximum OTP Attempts Exceeded');
  }

  // Compare OTP
  const isValid = await compareOTPHash(otp, userOTP.code);
  if (!isValid) {
    userOTP.attempts += 1;
    await user.save();
    throw new BadRequestErrorException('Invalid OTP');
  }

  // Remove OTP after successful verification
  user.otp = user.otp.filter(item => item.type !== type);
  await user.save();
  return user;
};
