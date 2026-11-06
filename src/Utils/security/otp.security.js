import { randomInt } from 'node:crypto';
import { generateHash, compareHash } from './hash.security.js';

import { HashEnum } from '../enums/security.enums.js';

// Generate 6 Digits OTP
export const generateOTP = () => {
  return String(randomInt(100000, 1000000));
};

// Generate OTP Hash
export const hashOTP = async otp => {
  return generateHash({
    plaintext: otp,
    algorithm: HashEnum.Bycrpt
  });
};

// Compare OTP with Hashed OTP
export const compareOTPHash = async (otp, hashedOTP) => {
  return compareHash({
    plaintext: otp,
    ciphertext: hashedOTP,
    algorithm: HashEnum.Bycrpt
  });
};
